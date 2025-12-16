import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
    ChatResponse,
    Intent,
    ExtractedParams
} from '../models/chatbot.interfaces';
import { OrderService } from './order.service';
import { CustomerService } from './customer.service';
import { ProductService } from './product.service';
import { RestaurantService } from './restaurant.service';
import { MotorcycleService } from './motorcycle.service';
import { MenuService } from './menu.service';
import { IssueService } from './issue.service';
import { DriverService } from './driver.service';

@Injectable({
    providedIn: 'root'
})
export class ChatbotAgentService {
    // Usaremos Groq (compatible con OpenAI API) para velocidad y capa gratuita
    private apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
    private knowledgeBase: any;

    constructor(
        private http: HttpClient,
        private orderService: OrderService,
        private customerService: CustomerService,
        private productService: ProductService,
        private restaurantService: RestaurantService,
        private motorcycleService: MotorcycleService,
        private menuService: MenuService,
        private issueService: IssueService,
        private driverService: DriverService
    ) {
        this.loadKnowledgeBase();
    }

    private loadKnowledgeBase(): void {
        this.http.get('/assets/data/chatbot-knowledge.json')
            .subscribe(
                (data) => this.knowledgeBase = data,
                (error) => console.error('Error loading knowledge base:', error)
            );
    }

    processMessage(message: string, mode: 'chat' | 'agent' = 'agent'): Observable<ChatResponse> {
        // Nota: Mantenemos el parámetro 'mode' por compatibilidad si el componente lo envía,
        // pero ahora la lógica es siempre "inteligente" (Agente Unificado).

        console.log(`🤖 Chatbot - Mensaje recibido:`, message);

        // 1. Enviamos TODO a la IA (Groq) para que procese inteligencia y contexto
        return this.callGroqApi(message).pipe(
            switchMap(response => {
                try {
                    const jsonText = this.extractJsonFromResponse(response);
                    const parsed = JSON.parse(jsonText);

                    // Si es un objeto de acción
                    if (parsed.action && parsed.action !== 'query' && parsed.action !== 'none') {
                        console.log('⚡ Acción detectada por IA:', parsed);
                        return this.executeAction(parsed);
                    }

                    // Si es 'query' o 'none', pero tiene un mensaje 'answer' o similar
                    if (parsed.answer) {
                        return of({ message: parsed.answer, type: 'info' as const });
                    }

                    // Si la IA devolvió JSON pero no acción clara, mostrarmos el texto raw si existe
                    return of({ message: parsed.message || JSON.stringify(parsed), type: 'info' as const });

                } catch (e) {
                    // Si no es JSON, es una respuesta conversacional normal
                    return of({ message: response, type: 'info' as const });
                }
            }),
            catchError(err => {
                console.error('❌ Error llamando a Groq:', err);
                if (err.error) console.error('🔍 Detalle del error Groq:', err.error);

                return of({
                    message: '⚠️ Lo siento, tuve un problema técnico con la IA. (Error 400/500). Revisa la consola para más detalles.',
                    type: 'error' as const
                });
            })
        );
    }

    private searchKnowledge(message: string): string | null {
        if (!this.knowledgeBase || !this.knowledgeBase.knowledge) return null;
        const msg = message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        for (const cat of this.knowledgeBase.knowledge.categories) {
            for (const qa of cat.questions) {
                if (qa.keywords.some((k: string) => msg.includes(k.toLowerCase()))) return qa.answer;
            }
        }
        return null;
    }

    private callGroqApi(userMessage: string): Observable<string> {
        const apiKey = environment.geminiApiKey; // La variable se llama igual pero ahora contiene la Key de Groq

        if (!apiKey || apiKey.includes('YOUR_')) {
            return of('{"answer": "⚠️ Por favor configura tu API Key de Groq en environment.ts"}');
        }

        const systemPrompt = `
Eres el Asistente Virtual del Sistema de Delivery.
Tu objetivo es ayudar a gestionar pedidos, productos, restaurantes, clientes, motos y reportes.

CONTEXTO DE CONOCIMIENTO (Reglas del Negocio):
${JSON.stringify(this.knowledgeBase?.knowledge?.categories || [], null, 2)}

INSTRUCCIONES CLAVE:
1. Si el usuario pide realizar una acción (crear, listar, buscar, eliminar), RESPONDE ÚNICAMENTE CON UN JSON válido.
2. Si el usuario hace una pregunta general, responde conversacionalmente (texto plano o JSON con campo "answer").
3. Para acciones "Crear", extrae todos los parámetros posibles.

FORMATO JSON PARA ACCIONES:
{
  "action": "create|update|delete|search|list",
  "entity": "order|customer|product|restaurant|motorcycle|menu|issue|driver",
  "params": { ...datos extraídos... }
}
Parametros requeridos por entidad:
- product: name, description, price, category
- restaurant: name, address, phone, email
- menu: restaurant_id, product_id, price
- customer: name, email, phone
- order: customer_name, product_name, quantity
- motorcycle: license_plate, brand, year
- issue: motorcycle_id (o placa), description, issue_type, date_reported
- driver: name, license_number, phone, email

Si NO es acción, responde amablemente.
`;

        const body = {
            model: "llama-3.3-70b-versatile", // Modelo actualizado (el anterior fue retirado)
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userMessage }
            ],
            temperature: 0.1, // Baja temperatura para más precisión en JSON
            stream: false
        };

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        });

        return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
            map(res => res.choices[0].message.content)
        );
    }

    private extractJsonFromResponse(text: string): string {
        const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
        return jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;
    }

    private executeAction(intent: any): Observable<ChatResponse> {
        const { action, entity, params } = intent;

        switch (action) {
            case 'create': return this.handleCreate(entity, params || {});
            case 'update': return this.handleUpdate(entity, params || {});
            case 'search': return this.handleGenericAction(entity, 'getById', params || {});
            case 'list': return this.handleGenericAction(entity, 'getAll', params || {});
            case 'delete': return this.handleDelete(entity, params || {});
            default: return of({ message: 'Acción no soportada por el sistema.', type: 'warning' });
        }
    }

    private handleUpdate(entity: string, params: any): Observable<ChatResponse> {
        const service = this.getService(entity);
        if (!service) return of({ message: `No existe servicio para ${entity}`, type: 'error' });

        if (!params.id) return of({ message: 'Para actualizar/asignar necesito el ID de la entidad.', type: 'warning' });

        return this.resolveParams(entity, params).pipe(
            switchMap((resolvedParams): Observable<ChatResponse> => {
                return service.update(params.id, resolvedParams).pipe(
                    map((data: any) => ({
                        message: `✅ ${entity} actualizado exitosamente.`,
                        type: 'success' as const,
                        data
                    } as ChatResponse)),
                    catchError(err => of({
                        message: `❌ Error al actualizar: ${err.message}`,
                        type: 'error' as const
                    } as ChatResponse))
                );
            })
        );
    }

    // --- Helpers de Servicios ---
    private getService(entity: string): any {
        switch (entity) {
            case 'order': return this.orderService;
            case 'customer': return this.customerService;
            case 'product': return this.productService;
            case 'restaurant': return this.restaurantService;
            case 'motorcycle': return this.motorcycleService;
            case 'menu': return this.menuService;
            case 'issue': return this.issueService;
            case 'driver': return this.driverService;
            default: return null;
        }
    }

    private handleCreate(entity: string, params: any): Observable<ChatResponse> {
        const service = this.getService(entity);
        if (!service) return of({ message: `No existe servicio para ${entity}`, type: 'error' });

        // Resolver IDs si los parámetros son nombres en lugar de números
        return this.resolveParams(entity, params).pipe(
            switchMap((resolvedParams): Observable<ChatResponse> => {
                console.log('📝 Params resueltos para crear:', resolvedParams);
                return service.create(resolvedParams).pipe(
                    map((data: any) => ({
                        message: `✅ ${entity} creado exitosamente. (ID: ${data.id})`,
                        type: 'success' as const,
                        data
                    } as ChatResponse)),
                    catchError(err => {
                        console.error('Error create:', err);
                        return of({
                            message: `❌ Error al crear: ${err.message || 'Verifica los datos'}`,
                            type: 'error' as const
                        } as ChatResponse);
                    })
                );
            })
        );
    }

    private resolveParams(entity: string, params: any): Observable<any> {
        const obsLikes: Observable<any>[] = [];

        // --- MENU ---
        if (entity === 'menu') {
            if (params.restaurant_id && isNaN(params.restaurant_id)) {
                obsLikes.push(this.restaurantService.getAll().pipe(
                    map((list: any[]) => {
                        const match = list.find(x => x.name.toLowerCase().includes(params.restaurant_id.toLowerCase()));
                        return match ? { key: 'restaurant_id', value: match.id } : null;
                    })
                ));
            }
            if (params.product_id && isNaN(params.product_id)) {
                obsLikes.push(this.productService.getAll().pipe(
                    map((list: any[]) => {
                        const match = list.find(x => x.name.toLowerCase().includes(params.product_id.toLowerCase()));
                        return match ? { key: 'product_id', value: match.id } : null;
                    })
                ));
            }
        }

        // --- ORDER ---
        if (entity === 'order') {
            // Resolver Customer (por nombre)
            if (params.customer_name && !params.customer_id) {
                obsLikes.push(this.customerService.getAll().pipe(
                    map((list: any[]) => {
                        const match = list.find(c => c.name.toLowerCase().includes(params.customer_name.toLowerCase()));
                        console.log(`🔎 Cliente '${params.customer_name}' ->`, match);
                        return match ? { key: 'customer_id', value: match.id } : null;
                    })
                ));
            }

            // Resolver Menu (combinando restaurant + product)
            if (params.restaurant_name && params.product_name && !params.menu_id) {
                obsLikes.push(this.menuService.getAll().pipe( // Asumimos que menuService ya tiene getAll
                    map((menus: any[]) => {
                        // Buscamos un menú que coincida con restaurante Y producto
                        // Nota: Esto depende de si el endpoint de menus devuelve los nombres anidados o planos.
                        // Intentaremos coincidencia laxa
                        const match = menus.find(m => {
                            // Validar estructura de Menu (ver modelo)
                            const rName = m.restaurant?.name || m.restaurant_name || '';
                            const pName = m.product?.name || m.product_name || '';
                            return rName.toLowerCase().includes(params.restaurant_name.toLowerCase()) &&
                                pName.toLowerCase().includes(params.product_name.toLowerCase());
                        });
                        console.log(`🔎 Menu por Rest/Prod ->`, match);
                        return match ? { key: 'menu_id', value: match.id } : null;
                    })
                ));
            }
        }

        // --- ISSUE ---
        if (entity === 'issue') {
            if (params.motorcycle_id && isNaN(params.motorcycle_id)) {
                // Si el LLM extrajo la PLACA en el campo 'motorcycle_id' o 'placa'
                const plate = params.motorcycle_id; // El prompt dice que puede poner la placa aquí
                obsLikes.push(this.motorcycleService.getAll().pipe(
                    map((list: any[]) => {
                        const match = list.find(m => m.license_plate?.toLowerCase().includes(plate.toLowerCase()));
                        console.log(`🔎 Moto por placa '${plate}' ->`, match);
                        return match ? { key: 'motorcycle_id', value: match.id } : null;
                    })
                ));
            }
        }

        // --- MOTORCYCLE (Assign Driver?) ---
        if (entity === 'motorcycle' && params.driver_name) {
            // Si hubiera logica de asignar conductor...
        }


        if (obsLikes.length === 0) return of(params);

        return forkJoin(obsLikes).pipe(
            map(results => {
                const newParams = { ...params };
                results.forEach(res => {
                    if (res) newParams[res.key] = res.value;
                });

                // Limpiezas extra
                if (typeof newParams.availability === 'string') newParams.availability = newParams.availability.toLowerCase().includes('dispo');

                // Si encontramos Menu ID para orden, limpiamos nombres sobrantes para no ensuciar payload
                if (entity === 'order' && newParams.menu_id) {
                    delete newParams.restaurant_name;
                    delete newParams.product_name;
                }

                return newParams;
            }),
            catchError(err => {
                console.error('Error resolving params:', err);
                return of(params);
            })
        );
    }

    private handleGenericAction(entity: string, method: 'getById' | 'getAll', params: any): Observable<ChatResponse> {
        const service = this.getService(entity);
        if (!service) return of({ message: `Servicio no encontrado`, type: 'error' });

        const obs$ = method === 'getById' ? service.getById(params.id) : service.getAll();
        return obs$.pipe(
            map(res => ({
                message: method === 'getAll'
                    ? `📋 Lista de ${entity}s (${(res as any[]).length})`
                    : `🔍 Datos de ${entity}:\n${JSON.stringify(res, null, 2)}`,
                type: 'info' as const, data: res
            })),
            catchError(() => of({ message: 'Error en operación', type: 'error' as const }))
        );
    }

    private handleDelete(entity: string, params: any): Observable<ChatResponse> {
        if (!params.id) return of({ message: 'Se requiere ID para eliminar.', type: 'warning' });
        return of({ message: `¿Estás seguro de eliminar el ${entity} ${params.id}?`, type: 'confirmation', requiresConfirmation: true, pendingAction: { entity, id: params.id } });
    }

    confirmDelete(entity: string, id: number): Observable<ChatResponse> {
        const service = this.getService(entity);
        if (!service) return of({ message: 'Error', type: 'error' });
        return service.delete(id).pipe(map(() => ({ message: 'Eliminado correctamente.', type: 'success' as const })), catchError(() => of({ message: 'Error al eliminar', type: 'error' as const })));
    }
}
