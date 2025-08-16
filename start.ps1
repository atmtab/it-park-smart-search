# IT Park Smart Search - PowerShell Launcher
Write-Host "🚀 Запуск IT Park Smart Search..." -ForegroundColor Green
Write-Host ""

Write-Host "📁 Текущая директория: $PWD" -ForegroundColor Cyan
Write-Host ""

Write-Host "📦 Проверка зависимостей..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "⏳ Установка зависимостей..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "✅ Зависимости уже установлены" -ForegroundColor Green
}

Write-Host ""
Write-Host "🌐 Запуск сервера на http://localhost:3000" -ForegroundColor Green
Write-Host "📱 Основное приложение: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🧪 Тестирование API: http://localhost:3000/test.html" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Для остановки сервера нажмите Ctrl+C" -ForegroundColor Yellow
Write-Host ""

npm start
