# 🚀 Быстрый деплой на GitHub Pages

## ⚡ Экспресс-деплой (5 минут)

### 1. Создайте репозиторий
```bash
# На GitHub создайте: atmtab.github.io
```

### 2. Клонируйте и настройте
```bash
git clone https://github.com/atmtab/atmtab.github.io.git
cd atmtab.github.io
```

### 3. Скопируйте файлы
```bash
# Скопируйте ВСЕ файлы из текущего проекта
cp -r /path/to/your/project/* .
```

### 4. Соберите и задеплойте
```bash
npm install
npm run build
```

### 5. Создайте ветку gh-pages
```bash
git checkout -b gh-pages
git rm -rf *
cp -r dist/* .
git add .
git commit -m "Deploy IT Park Smart Search"
git push origin gh-pages
```

### 6. Настройте GitHub Pages
- Settings → Pages → Source: Deploy from a branch
- Branch: gh-pages
- Save

## 🎯 Результат

Ваше приложение будет доступно по адресу:
**https://atmtab.github.io/**

## 📱 Проверка

- ✅ Основное приложение: https://atmtab.github.io/
- ✅ Тест API: https://atmtab.github.io/test.html
- ✅ Поиск: введите "erp системы"

## 🔄 Обновления

Просто пущите в main:
```bash
git checkout main
git add .
git commit -m "Update"
git push origin main
```

GitHub Actions автоматически задеплоит!
