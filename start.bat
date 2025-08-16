@echo off
echo 🚀 Запуск IT Park Smart Search...
echo.
echo 📁 Текущая директория: %CD%
echo.
echo 📦 Проверка зависимостей...
if not exist "node_modules" (
    echo ⏳ Установка зависимостей...
    npm install
) else (
    echo ✅ Зависимости уже установлены
)
echo.
echo 🌐 Запуск сервера на http://localhost:3000
echo 📱 Основное приложение: http://localhost:3000
echo 🧪 Тестирование API: http://localhost:3000/test.html
echo.
echo 💡 Для остановки сервера нажмите Ctrl+C
echo.
npm start
pause
