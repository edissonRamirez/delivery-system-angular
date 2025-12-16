import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatbotAgentService } from '../../services/chatbot-agent.service';
import { ChatMessage, ChatResponse } from '../../models/chatbot.interfaces';

@Component({
    selector: 'app-chatbot',
    templateUrl: './chatbot.component.html',
    styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
    @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

    isOpen = false;
    isLoading = false;
    messages: ChatMessage[] = [];
    userInput = '';
    pendingConfirmation: any = null;

    private shouldScrollToBottom = false;

    constructor(private chatbotService: ChatbotAgentService) { }

    ngOnInit(): void {
        this.loadHistory();
    }

    ngAfterViewChecked(): void {
        if (this.shouldScrollToBottom) {
            this.scrollToBottom();
            this.shouldScrollToBottom = false;
        }
    }

    private loadHistory(): void {
        const saved = localStorage.getItem('chatbot_history');
        if (saved) {
            try {
                this.messages = JSON.parse(saved);
                // Si hay historial, no mostramos el mensaje de bienvenida de nuevo, o tal vez sí? 
                // Mejor no, para mantener el hilo.
                // Scroll al final al cargar
                setTimeout(() => this.scrollToBottom(), 100);
            } catch (e) {
                console.error('Error parsing chat history', e);
                this.messages = [];
                this.addWelcomeMessage();
            }
        } else {
            this.addWelcomeMessage();
        }
    }

    private saveHistory(): void {
        localStorage.setItem('chatbot_history', JSON.stringify(this.messages));
    }

    private addWelcomeMessage(): void {
        this.addBotMessage(
            '👋 ¡Hola! Soy tu Asistente Inteligente (Powered by Llama 3).\n\n' +
            'Puedo ayudarte con consultas y acciones del sistema.\n' +
            'Ejemplos: "Listar productos", "Crear una orden", "¿Cuál es el horario?"',
            'info'
        );
    }

    toggleChat(): void {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            setTimeout(() => this.scrollToBottom(), 100);
        }
    }

    sendMessage(): void {
        if (!this.userInput.trim() || this.isLoading) {
            return;
        }

        const message = this.userInput.trim();
        this.userInput = '';

        this.addUserMessage(message);
        this.isLoading = true;

        // Llamada unificada (ya no hay 'mode')
        this.chatbotService.processMessage(message).subscribe({
            next: (response: ChatResponse) => {
                this.isLoading = false;
                this.handleResponse(response);
            },
            error: (error) => {
                this.isLoading = false;
                this.addBotMessage(
                    '❌ Error de conexión con el cerebro del bot.',
                    'error'
                );
            }
        });
    }

    handleResponse(response: ChatResponse): void {
        if (response.requiresConfirmation) {
            this.pendingConfirmation = response.pendingAction;
            this.addBotMessage(response.message, response.type, true);
        } else {
            this.addBotMessage(response.message, response.type);
        }
    }

    confirmAction(): void {
        if (!this.pendingConfirmation) return;

        this.isLoading = true;
        const { entity, id } = this.pendingConfirmation;

        this.chatbotService.confirmDelete(entity, id).subscribe({
            next: (response: ChatResponse) => {
                this.isLoading = false;
                this.pendingConfirmation = null;
                this.addBotMessage(response.message, response.type);
            },
            error: (error) => {
                this.isLoading = false;
                this.pendingConfirmation = null;
                this.addBotMessage(
                    '❌ Error al ejecutar la acción.',
                    'error'
                );
            }
        });
    }

    cancelAction(): void {
        this.pendingConfirmation = null;
        this.addBotMessage('Acción cancelada.', 'info');
    }

    addUserMessage(text: string): void {
        const message: ChatMessage = {
            id: this.generateId(),
            text,
            sender: 'user',
            timestamp: new Date(),
            type: 'info'
        };
        this.messages.push(message);
        this.saveHistory(); // Guardar
        this.shouldScrollToBottom = true;
    }

    addBotMessage(text: string, type: ChatMessage['type'], hasConfirmation = false): void {
        const message: ChatMessage = {
            id: this.generateId(),
            text,
            sender: 'bot',
            timestamp: new Date(),
            type,
            data: hasConfirmation ? { hasConfirmation } : undefined
        };
        this.messages.push(message);
        this.saveHistory(); // Guardar
        this.shouldScrollToBottom = true;
    }

    private scrollToBottom(): void {
        try {
            if (this.messagesContainer) {
                this.messagesContainer.nativeElement.scrollTop =
                    this.messagesContainer.nativeElement.scrollHeight;
            }
        } catch (err) {
            console.error('Error scrolling to bottom:', err);
        }
    }

    private generateId(): string {
        return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    onKeyPress(event: KeyboardEvent): void {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.sendMessage();
        }
    }

    getMessageClass(message: ChatMessage): string {
        const classes = ['message', message.sender];
        if (message.type !== 'info') {
            classes.push(message.type);
        }
        return classes.join(' ');
    }

    formatMessageText(text: string): string {
        return text.replace(/\n/g, '<br>');
    }
}
