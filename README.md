# Display de Mensajes - LSM

Aplicación web que recibe mensajes vía API y los muestra en una pantalla amarilla centrada.

## 🐳 Ejecución con Docker (Recomendado)

### Opción 1: Usar Docker Compose

```bash
docker-compose up -d
```

### Opción 2: Usar Docker directamente

```bash
# Construir la imagen
docker build -t lsm-display .

# Ejecutar el contenedor
docker run -d -p 3000:3000 --name lsm-display lsm-display
```

### Detener el contenedor

```bash
# Con Docker Compose
docker-compose down

# Con Docker directamente
docker stop lsm-display
docker rm lsm-display
```

## 📦 Instalación Local (Sin Docker)

```bash
npm install
```

## Uso

1. Iniciar el servidor:

```bash
npm start
```

2. Abrir en el navegador:

```
http://localhost:3000
```

3. Enviar un mensaje vía API:

### Con PowerShell:

```powershell
$body = @{
    message = "Hola Mundo"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/api/message -Method Post -Body $body -ContentType "application/json"
```

### Con curl:

```bash
curl -X POST http://localhost:3000/api/message -H "Content-Type: application/json" -d "{\"message\":\"Hola Mundo\"}"
```

### Con Postman o cualquier cliente HTTP:

- URL: `http://localhost:3000/api/message`
- Método: POST
- Headers: `Content-Type: application/json`
- Body (JSON):

```json
{
  "message": "Tu mensaje aquí"
}
```

## Endpoints API

- **POST /api/message** - Enviar un nuevo mensaje para mostrar
  - Body: `{ "message": "tu texto" }`
- **GET /api/message** - Obtener el mensaje actual

## Características

- Pantalla completamente amarilla
- Texto centrado en la pantalla
- Actualización automática cada segundo
- API REST para enviar mensajes
- Preparado para integración futura con base de datos
