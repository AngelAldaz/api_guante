# Display de Mensajes - LSM

Aplicación web que recibe mensajes vía API y los muestra en una pantalla amarilla centrada.

## Instalación

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
