# 🚀 IT Park Smart Search - Деплой в GitHub

## 📋 Пошаговая инструкция

### 1. Создание нового репозитория на GitHub

1. Перейдите на [GitHub](https://github.com)
2. Нажмите "New repository" или "+" → "New repository"
3. Введите название: `it-park-smart-search`
4. Выберите "Public" (для GitHub Pages)
5. **НЕ** инициализируйте с README, .gitignore или license
6. Нажмите "Create repository"

### 2. Настройка локального репозитория

```bash
# Перейдите в директорию проекта
cd working-version-with-api

# Инициализируйте git репозиторий
git init

# Добавьте все файлы
git add .

# Сделайте первый коммит
git commit -m "Initial commit: IT Park Smart Search"

# Добавьте удаленный репозиторий (замените YOUR_USERNAME на ваше имя пользователя)
git remote add origin https://github.com/YOUR_USERNAME/it-park-smart-search.git

# Переименуйте основную ветку в main
git branch -M main

# Отправьте код в репозиторий
git push -u origin main
```

### 3. Настройка GitHub Pages

1. В репозитории перейдите в "Settings" → "Pages"
2. В "Source" выберите "GitHub Actions"
3. GitHub автоматически будет использовать workflow из `.github/workflows/deploy.yml`

### 4. Обновление package.json

**ВАЖНО**: Перед первым коммитом замените в `package.json`:

```json
"repository": {
  "type": "git",
  "url": "https://github.com/YOUR_USERNAME/it-park-smart-search.git"
},
"homepage": "https://YOUR_USERNAME.github.io/it-park-smart-search/"
```

Замените `YOUR_USERNAME` на ваше реальное имя пользователя GitHub.

### 5. Первый деплой

После настройки:

1. GitHub Actions автоматически запустится при push
2. Проект будет собран и задеплоен
3. Сайт будет доступен по адресу: `https://YOUR_USERNAME.github.io/it-park-smart-search/`

## 🔧 Проверка деплоя

### Локальная проверка

```bash
# Установите зависимости
npm install

# Запустите локально
npm start

# Откройте http://localhost:3000
```

### Проверка GitHub Pages

1. Перейдите в "Actions" в репозитории
2. Убедитесь, что workflow выполнился успешно
3. Проверьте сайт по адресу Pages

## 📁 Структура после деплоя

```
it-park-smart-search/
├── 📁 .github/                    # GitHub Actions
├── 📁 data/                       # Данные компаний
├── 📁 public/                     # Статические файлы
├── 📁 scripts/                    # Скрипты сборки
├── 📄 server.js                   # Node.js сервер
├── 📄 package.json                # Зависимости
├── 📄 README.md                   # Документация
├── 📄 .gitignore                  # Git игнорирование
└── 📄 DEPLOY-TO-GITHUB.md        # Эта инструкция
```

## 🚨 Возможные проблемы

### Ошибка "Repository not found"
- Проверьте правильность URL репозитория
- Убедитесь, что репозиторий существует и доступен

### Ошибка сборки
- Проверьте логи в GitHub Actions
- Убедитесь, что все зависимости указаны в package.json

### Сайт не открывается
- Проверьте настройки Pages в Settings
- Убедитесь, что workflow выполнился успешно

## 🎉 Готово!

После успешного деплоя ваш проект будет доступен на GitHub Pages с полной функциональностью поиска резидентов IT-Park!
