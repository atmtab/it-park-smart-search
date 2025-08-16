@echo off
echo 🚀 Деплой IT Park Smart Search в GitHub для Render...
echo.

echo 📋 Шаг 1: Проверка Git...
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git не установлен! Установите Git с https://git-scm.com/
    pause
    exit /b 1
)

echo ✅ Git найден
echo.

echo 📋 Шаг 2: Инициализация Git репозитория...
if not exist .git (
    git init
    echo ✅ Git репозиторий инициализирован
) else (
    echo ✅ Git репозиторий уже существует
)

echo.
echo 📋 Шаг 3: Добавление файлов...
git add .
echo ✅ Файлы добавлены в staging

echo.
echo 📋 Шаг 4: Коммит изменений...
git commit -m "Initial commit: IT Park Smart Search"
echo ✅ Изменения закоммичены

echo.
echo 📋 Шаг 5: Настройка удаленного репозитория...
echo.
echo ⚠️  ВАЖНО: Сначала создайте репозиторий на GitHub!
echo     Название: it-park-smart-search
echo     Тип: Public или Private
echo     НЕ инициализируйте с README, .gitignore или license
echo.
echo 📝 Введите ваше имя пользователя GitHub:
set /p username=

if "%username%"=="" (
    echo ❌ Имя пользователя не введено!
    pause
    exit /b 1
)

echo.
echo 📋 Шаг 6: Добавление удаленного репозитория...
git remote add origin https://github.com/%username%/it-park-smart-search.git
echo ✅ Удаленный репозиторий добавлен

echo.
echo 📋 Шаг 7: Переименование ветки в main...
git branch -M main
echo ✅ Ветка переименована в main

echo.
echo 📋 Шаг 8: Отправка кода в GitHub...
git push -u origin main
echo ✅ Код отправлен в GitHub!

echo.
echo 🎉 Деплой в GitHub завершен!
echo.
echo 📋 Следующие шаги для Render:
echo 1. Перейдите в репозиторий: https://github.com/%username%/it-park-smart-search
echo 2. Перейдите на https://render.com
echo 3. Создайте новый Web Service
echo 4. Подключите ваш GitHub репозиторий
echo 5. Настройте переменные окружения
echo 6. Дождитесь деплоя
echo.
echo 📖 Подробная инструкция в файле DEPLOY-TO-RENDER.md
echo.
pause
