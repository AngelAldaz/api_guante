# Display de Mensajes - LSM

Aplicación web que recibe códigos vía API, los convierte en letras usando una base de datos y muestra el mensaje formado en una pantalla amarilla centrada.

## 🐳 Ejecución con Docker (Recomendado)

### Usar Docker Compose

```bash
docker-compose up -d
```

Esto iniciará:

- **MySQL 8.0** con la base de datos `lsm_db` (puerto 3306)
- **Aplicación Node.js** (puerto 3000)
- La base de datos se inicializará automáticamente con el alfabeto

### Detener el contenedor

```bash
docker-compose down
```

### Ver logs

```bash
docker-compose logs -f lsm-app
```

## 📦 Instalación Local (Sin Docker)

```bash
npm install
```

Necesitarás configurar MySQL localmente y ejecutar el archivo `init-db.sql`.

## 🚀 Uso

1. **Abrir en el navegador:**

```
http://localhost:3000
```

2. **Enviar códigos para formar palabras:**

### Con PowerShell:

```powershell
# Enviar letra 'h' (hola)
$body = @{ code = "890-123-456-789-012-345" } | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:3000/api/code -Method Post -Body $body -ContentType "application/json"

# Enviar letra 'o'
$body = @{ code = "852-963-741-852-963-741" } | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:3000/api/code -Method Post -Body $body -ContentType "application/json"

# Enviar letra 'l'
$body = @{ code = "258-369-147-258-369-147" } | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:3000/api/code -Method Post -Body $body -ContentType "application/json"

# Enviar letra 'a'
$body = @{ code = "123-456-789-012-345-678" } | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:3000/api/code -Method Post -Body $body -ContentType "application/json"

# Reiniciar el mensaje
Invoke-RestMethod -Uri http://localhost:3000/api/reset -Method Post
```

### Con curl:

```bash
# Enviar un código
curl -X POST http://localhost:3000/api/code -H "Content-Type: application/json" -d "{\"code\":\"123-456-789-012-345-678\"}"

# Reiniciar
curl -X POST http://localhost:3000/api/reset
```

## 📡 Endpoints API

### POST `/api/code`

Recibe un código y agrega la letra correspondiente al mensaje.

**Body (JSON):**

```json
{
  "code": "123-456-789-012-345-678"
}
```

**Respuesta:**

```json
{
  "success": true,
  "letter": "a",
  "currentMessage": "a"
}
```

### POST `/api/reset`

Reinicia el mensaje actual a vacío.

**Respuesta:**

```json
{
  "success": true,
  "message": "Mensaje reiniciado correctamente"
}
```

### GET `/api/message`

Obtiene el mensaje actual formado.

**Respuesta:**

```json
{
  "message": "hola"
}
```

## 📋 Códigos del Alfabeto

| Letra | Código                  |
| ----- | ----------------------- |
| a     | 123-456-789-012-345-678 |
| b     | 234-567-890-123-456-789 |
| c     | 345-678-901-234-567-890 |
| d     | 456-789-012-345-678-901 |
| e     | 567-890-123-456-789-012 |
| f     | 678-901-234-567-890-123 |
| g     | 789-012-345-678-901-234 |
| h     | 890-123-456-789-012-345 |
| i     | 901-234-567-890-123-456 |
| j     | 012-345-678-901-234-567 |
| k     | 147-258-369-147-258-369 |
| l     | 258-369-147-258-369-147 |
| m     | 369-147-258-369-147-258 |
| n     | 741-852-963-741-852-963 |
| o     | 852-963-741-852-963-741 |
| p     | 963-741-852-963-741-852 |
| q     | 159-357-159-357-159-357 |
| r     | 357-159-357-159-357-159 |
| s     | 951-753-951-753-951-753 |
| t     | 753-951-753-951-753-951 |
| u     | 124-578-963-124-578-963 |
| v     | 578-963-124-578-963-124 |
| w     | 963-124-578-963-124-578 |
| x     | 321-654-987-321-654-987 |
| y     | 654-987-321-654-987-321 |
| z     | 987-321-654-987-321-654 |

## ✨ Características

- 🟡 Pantalla completamente amarilla
- 📝 Texto centrado con cursor parpadeante
- 🔄 Actualización automática cada segundo
- 🔤 Conversión de códigos a letras mediante base de datos MySQL
- 📊 Las letras se van acoplando para formar palabras
- 🔁 Endpoint de reinicio para empezar de nuevo
- 🐳 Completamente dockerizado con Docker Compose
- 📦 Base de datos MySQL con alfabeto precargado

## 🎯 Flujo de Trabajo

1. Enviar un código mediante POST a `/api/code`
2. El servidor busca la letra correspondiente en MySQL
3. La letra se agrega al mensaje actual
4. La pantalla muestra el mensaje formado con todas las letras
5. Repetir para formar palabras
6. Usar POST a `/api/reset` para reiniciar cuando sea necesario
