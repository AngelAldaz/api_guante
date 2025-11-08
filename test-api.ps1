# Script de PowerShell para probar la aplicación LSM
# Forma la palabra "hola"

Write-Host "🔄 Reiniciando mensaje..." -ForegroundColor Yellow
$reset = Invoke-RestMethod -Uri http://localhost:3000/api/reset -Method Post
Write-Host "✅ $($reset.message)" -ForegroundColor Green
Start-Sleep -Seconds 1

Write-Host "`n📝 Formando la palabra 'hola'..." -ForegroundColor Cyan

# Letra H
Write-Host "`nEnviando código para 'h'..." -ForegroundColor Yellow
$body = @{ code = "890-123-456-789-012-345" } | ConvertTo-Json
$response = Invoke-RestMethod -Uri http://localhost:3000/api/code -Method Post -Body $body -ContentType "application/json"
Write-Host "✅ Letra agregada: $($response.letter) | Mensaje actual: $($response.currentMessage)" -ForegroundColor Green
Start-Sleep -Seconds 1

# Letra O
Write-Host "`nEnviando código para 'o'..." -ForegroundColor Yellow
$body = @{ code = "852-963-741-852-963-741" } | ConvertTo-Json
$response = Invoke-RestMethod -Uri http://localhost:3000/api/code -Method Post -Body $body -ContentType "application/json"
Write-Host "✅ Letra agregada: $($response.letter) | Mensaje actual: $($response.currentMessage)" -ForegroundColor Green
Start-Sleep -Seconds 1

# Letra L
Write-Host "`nEnviando código para 'l'..." -ForegroundColor Yellow
$body = @{ code = "258-369-147-258-369-147" } | ConvertTo-Json
$response = Invoke-RestMethod -Uri http://localhost:3000/api/code -Method Post -Body $body -ContentType "application/json"
Write-Host "✅ Letra agregada: $($response.letter) | Mensaje actual: $($response.currentMessage)" -ForegroundColor Green
Start-Sleep -Seconds 1

# Letra A
Write-Host "`nEnviando código para 'a'..." -ForegroundColor Yellow
$body = @{ code = "123-456-789-012-345-678" } | ConvertTo-Json
$response = Invoke-RestMethod -Uri http://localhost:3000/api/code -Method Post -Body $body -ContentType "application/json"
Write-Host "✅ Letra agregada: $($response.letter) | Mensaje actual: $($response.currentMessage)" -ForegroundColor Green

Write-Host "`n🎉 ¡Palabra completada! Revisa http://localhost:3000" -ForegroundColor Green
Write-Host "📺 Deberías ver 'hola' en la pantalla amarilla" -ForegroundColor Cyan
