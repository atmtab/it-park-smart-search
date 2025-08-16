# 🚀 Деплой на GitHub Pages

Пошаговая инструкция по развертыванию проекта на GitHub Pages.

## 📋 Предварительные требования

1. ✅ GitHub аккаунт
2. ✅ Репозиторий `atmtab.github.io` (или другой с включенными GitHub Pages)
3. ✅ Node.js 18+ установлен локально

## 🔧 Настройка репозитория

### 1. Создание репозитория

Если у вас еще нет репозитория `atmtab.github.io`:

1. Перейдите на [GitHub](https://github.com)
2. Нажмите "New repository"
3. Назовите репозиторий: `atmtab.github.io`
4. Сделайте его публичным
5. Нажмите "Create repository"

### 2. Клонирование и настройка

```bash
# Клонируйте репозиторий
git clone https://github.com/atmtab/atmtab.github.io.git
cd atmtab.github.io

# Скопируйте файлы проекта
cp -r /path/to/your/project/* .

# Добавьте файлы в git
git add .
git commit -m "Initial commit: IT Park Smart Search"
git push origin main
```

## 🚀 Автоматический деплой

### 1. Настройка GitHub Pages

1. Перейдите в репозиторий на GitHub
2. Нажмите "Settings" → "Pages"
3. В разделе "Source" выберите "GitHub Actions"
4. Нажмите "Save"

### 2. Настройка GitHub Actions

1. Перейдите в "Actions" → "Deploy to GitHub Pages"
2. Нажмите "Run workflow"
3. Выберите ветку `main`
4. Нажмите "Run workflow"

### 3. Проверка деплоя

1. Дождитесь завершения workflow (зеленая галочка)
2. Перейдите в "Actions" → "Deploy to GitHub Pages" → "deploy"
3. В логах найдите URL: `Deploy to GitHub Pages`
4. Откройте ссылку для проверки

## 🔧 Ручной деплой

### 1. Сборка проекта

```bash
# Установите зависимости
npm install

# Соберите проект
npm run build
```

### 2. Создание ветки gh-pages

```bash
# Создайте ветку gh-pages
git checkout -b gh-pages

# Удалите все файлы кроме dist
git rm -rf *
git checkout main -- .gitignore README.md

# Скопируйте собранные файлы
cp -r dist/* .

# Добавьте и закоммитьте
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

### 3. Настройка GitHub Pages

1. Перейдите в "Settings" → "Pages"
2. В разделе "Source" выберите "Deploy from a branch"
3. Выберите ветку `gh-pages`
4. Нажмите "Save"

## 📱 Проверка работы

После деплоя проверьте:

- ✅ **Основное приложение**: https://atmtab.github.io/
- ✅ **Тест API**: https://atmtab.github.io/test.html
- ✅ **Поиск работает**: введите "erp системы"
- ✅ **AI ответы**: получаете осмысленные ответы от DeepSeek

## 🔄 Обновление

### Автоматическое обновление

Просто пущите изменения в ветку `main`:

```bash
git add .
git commit -m "Update: описание изменений"
git push origin main
```

GitHub Actions автоматически соберет и задеплоит проект.

### Ручное обновление

```bash
# Соберите проект
npm run build

# Переключитесь на gh-pages
git checkout gh-pages

# Обновите файлы
cp -r dist/* .

# Закоммитьте и запушьте
git add .
git commit -m "Update: описание изменений"
git push origin gh-pages
```

## 🐛 Решение проблем

### Проблема: Страница не загружается

1. Проверьте статус деплоя в "Actions"
2. Убедитесь, что GitHub Pages включены в "Settings"
3. Проверьте, что ветка `gh-pages` существует

### Проблема: API не работает

1. Проверьте консоль браузера на ошибки
2. Убедитесь, что API ключ DeepSeek актуален
3. Проверьте CORS настройки

### Проблема: Стили не применяются

1. Убедитесь, что все CSS файлы скопированы в `dist/`
2. Проверьте пути к файлам в HTML
3. Очистите кэш браузера

## 📞 Поддержка

При возникновении проблем:

1. Проверьте логи в "Actions"
2. Создайте Issue в репозитории
3. Обратитесь к команде IT-Park

## 🎯 Следующие шаги

После успешного деплоя:

1. Настройте кастомный домен (опционально)
2. Добавьте аналитику (Google Analytics)
3. Настройте мониторинг производительности
4. Добавьте автоматическое тестирование
