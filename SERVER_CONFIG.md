# Configuración de Servidores

## Puertos Configurados

### Backend Principal (Puerto 5000)
- **URL:** `http://localhost:5000`
- **Variable:** `environment.url_web_socket`
- **Uso:** Pedidos, clientes, productos, restaurantes, motocicletas
- **Servicios:** OrderService, CustomerService, ProductService, RestaurantService, MotorcycleService

### Backend de Reportes (Puerto 3000)
- **URL:** `http://localhost:3000`
- **Variable:** `environment.url_reports`
- **Uso:** Gráficas y reportes del dashboard
- **Servicio:** ReportsService
- **Implementación:** JSON Server (mock backend)

## Cómo Ejecutar

### 1. Backend Principal (Puerto 5000)
```bash
# Ejecuta tu backend real en el puerto 5000
# (comando depende de tu implementación)
```

### 2. JSON Server para Reportes (Puerto 3000)
```bash
json-server --watch json-server/reports.json --port 3000
```

### 3. Angular Dev Server (Puerto 4200)
```bash
npm start
```

## Notas Importantes

- ✅ **Sin conflictos:** Backend principal (5000) y reportes (3000) usan puertos diferentes
- ✅ **Chatbot:** Usa el backend principal (puerto 5000) para operaciones CRUD
- ✅ **Reportes:** Usa json-server (puerto 3000) para datos de gráficas
- ⚠️ **Importante:** Debes tener ambos servidores corriendo para funcionalidad completa

## Endpoints de JSON Server (Puerto 3000)

- `http://localhost:3000/pieReports` - Gráficas de pastel
- `http://localhost:3000/barReports` - Gráficas de barras  
- `http://localhost:3000/lineReports` - Gráficas de líneas
