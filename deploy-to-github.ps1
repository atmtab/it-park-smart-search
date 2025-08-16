# 🚀 Деплой IT Park Smart Search в GitHub
Write-Host "🚀 Деплой IT Park Smart Search в GitHub..." -ForegroundColor Green
Write-Host ""

# Шаг 1: Проверка Git
Write-Host "📋 Шаг 1: Проверка Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✅ Git найден: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git не установлен! Установите Git с https://git-scm.com/" -ForegroundColor Red
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

Write-Host ""

# Шаг 2: Инициализация Git репозитория
Write-Host "📋 Шаг 2: Инициализация Git репозитория..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    git init
    Write-Host "✅ Git репозиторий инициализирован" -ForegroundColor Green
} else {
    Write-Host "✅ Git репозиторий уже существует" -ForegroundColor Green
}

Write-Host ""

# Шаг 3: Добавление файлов
Write-Host "📋 Шаг 3: Добавление файлов..." -ForegroundColor Yellow
git add .
Write-Host "✅ Файлы добавлены в staging" -ForegroundColor Green

Write-Host ""

# Шаг 4: Коммит изменений
Write-Host "📋 Шаг 4: Коммит изменений..." -ForegroundColor Yellow
git commit -m "Initial commit: IT Park Smart Search"
Write-Host "✅ Изменения закоммичены" -ForegroundColor Green

Write-Host ""

# Шаг 5: Настройка удаленного репозитория
Write-Host "📋 Шаг 5: Настройка удаленного репозитория..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  ВАЖНО: Сначала создайте репозиторий на GitHub!" -ForegroundColor Red
Write-Host "     Название: it-park-smart-search" -ForegroundColor White
Write-Host "     Тип: Public" -ForegroundColor White
Write-Host "     НЕ инициализируйте с README, .gitignore или license" -ForegroundColor White
Write-Host ""

$username = Read-Host "📝 Введите ваше имя пользователя GitHub"

if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "❌ Имя пользователя не введено!" -ForegroundColor Red
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

Write-Host ""

# Шаг 6: Добавление удаленного репозитория
Write-Host "📋 Шаг 6: Добавление удаленного репозитория..." -ForegroundColor Yellow
git remote add origin "https://github.com/$username/it-park-smart-search.git"
Write-Host "✅ Удаленный репозиторий добавлен" -ForegroundColor Green

Write-Host ""

# Шаг 7: Переименование ветки в main
Write-Host "📋 Шаг 7: Переименование ветки в main..." -ForegroundColor Yellow
git branch -M main
Write-Host "✅ Ветка переименована в main" -ForegroundColor Green

Write-Host ""

# Шаг 8: Отправка кода в GitHub
Write-Host "📋 Шаг 8: Отправка кода в GitHub..." -ForegroundColor Yellow
git push -u origin main
Write-Host "✅ Код отправлен в GitHub!" -ForegroundColor Green

Write-Host ""
Write-Host "🎉 Деплой завершен!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Следующие шаги:" -ForegroundColor Cyan
Write-Host "1. Перейдите в репозиторий: https://github.com/$username/it-park-smart-search" -ForegroundColor White
Write-Host "2. В Settings → Pages выберите 'GitHub Actions'" -ForegroundColor White
Write-Host "3. Дождитесь завершения workflow" -ForegroundColor White
Write-Host "4. Сайт будет доступен: https://$username.github.io/it-park-smart-search/" -ForegroundColor White
Write-Host ""
Write-Host "📖 Подробная инструкция в файле DEPLOY-TO-GITHUB.md" -ForegroundColor Cyan
Write-Host ""

Read-Host "Нажмите Enter для выхода"
