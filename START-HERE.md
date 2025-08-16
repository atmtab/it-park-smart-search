# 🚀 IT Park Smart Search - Начало работы

## 🎯 Что это?

**IT Park Smart Search** - это умное веб-приложение для поиска резидентов IT-Park с использованием AI API DeepSeek. Проект предоставляет:

- 🔍 **Интеллектуальный поиск** по компаниям
- 🤖 **AI-powered поиск** через DeepSeek API
- 📱 **Адаптивный дизайн** для всех устройств
- ⚡ **Быстрый локальный поиск** как fallback
- 🌐 **Готовность к деплою** на GitHub Pages

## 🚀 Быстрый старт

### Вариант 1: Локальный запуск (для разработки)

```bash
# Установка зависимостей
npm install

# Запуск сервера
npm start

# Открыть в браузере: http://localhost:3000
```

### Вариант 2: Деплой в GitHub (для продакшена)

1. **Создайте репозиторий** на GitHub с названием `it-park-smart-search`
2. **Запустите скрипт деплоя**:
   - Windows: `deploy-to-github.bat` или `deploy-to-github.ps1`
   - Linux/Mac: следуйте инструкции в `DEPLOY-TO-GITHUB.md`

## 📁 Структура проекта

```
working-version-with-api/
├── 📁 .github/                    # GitHub Actions для автоматического деплоя
├── 📁 data/                       # Данные компаний (JSON)
├── 📁 public/                     # Статические файлы (HTML, CSS, JS)
├── 📁 scripts/                    # Скрипты сборки
├── 📄 server.js                   # Node.js сервер с API
├── 📄 package.json                # Зависимости и скрипты
├── 📄 README.md                   # Основная документация
├── 📄 QUICK-START.md              # Быстрый старт
├── 📄 DEPLOY-TO-GITHUB.md         # Подробная инструкция по деплою
├── 📄 deploy-to-github.bat        # Windows batch скрипт
├── 📄 deploy-to-github.ps1        # PowerShell скрипт
└── 📄 START-HERE.md               # Этот файл
```

## 🔧 Основные команды

```bash
npm start          # Запуск сервера разработки
npm run dev        # Запуск с nodemon (автоперезагрузка)
npm run build      # Сборка для GitHub Pages
npm run preview    # Предварительный просмотр сборки
```

## 🌐 API Endpoints

- `GET /api/companies` - полные данные компаний
- `GET /api/companies-mini` - мини-данные для API
- `POST /api/search` - поиск компаний
- `POST /api/test-deepseek` - тест DeepSeek API

## 📱 Особенности

- ✅ **Полная поддержка API** - все endpoints работают
- ✅ **Node.js сервер** - Express.js для разработки
- ✅ **DeepSeek API** - интеллектуальный поиск
- ✅ **Fallback поиск** - локальный поиск при недоступности API
- ✅ **CORS поддержка** - безопасные запросы
- ✅ **Обработка ошибок** - graceful fallback
- ✅ **GitHub Pages** - готовность к деплою

## 🎯 Следующие шаги

### Для разработки:
1. Изучите `README.md` для понимания архитектуры
2. Запустите локально: `npm start`
3. Откройте http://localhost:3000

### Для деплоя:
1. Прочитайте `QUICK-START.md` для быстрого старта
2. Изучите `DEPLOY-TO-GITHUB.md` для детальной инструкции
3. Запустите скрипт деплоя

## 🚨 Поддержка

Если возникли проблемы:

1. **Проверьте логи** в консоли
2. **Изучите документацию** в файлах проекта
3. **Проверьте GitHub Actions** (если деплоите)
4. **Убедитесь в корректности** настроек репозитория

## 🎉 Готово!

Теперь у вас есть полнофункциональное приложение для поиска резидентов IT-Park с возможностью локальной разработки и деплоя на GitHub Pages!

---

**Выберите свой путь:**
- 🏠 **Локальная разработка** → `npm start`
- 🚀 **Деплой в GitHub** → `deploy-to-github.bat` или `deploy-to-github.ps1`
