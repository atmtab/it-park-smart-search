const fs = require('fs');
const path = require('path');

console.log('🚀 Сборка проекта для GitHub Pages...');

// Создаем папку dist если её нет
const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Копируем статические файлы
const filesToCopy = [
  'public/index.html',
  'public/styles.css',
  'public/script.js',
  'public/api.js',
  'public/test.html',
  'data/data.json',
  'data/data-mini.json'
];

filesToCopy.forEach(file => {
  const sourcePath = path.join(__dirname, '..', file);
  const targetPath = path.join(distDir, path.basename(file));
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`✅ Скопирован: ${file}`);
  } else {
    console.log(`⚠️ Файл не найден: ${file}`);
  }
});

// Создаем README для GitHub Pages
const readmeContent = `# IT Park Smart Search

Умный поиск резидентов IT-Park с использованием AI API DeepSeek.

## 🚀 Демо

[Открыть приложение](https://atmtab.github.io/)

## 🧪 Тестирование API

[Тест API DeepSeek](https://atmtab.github.io/test.html)

## 📁 Структура проекта

- \`index.html\` - основное приложение
- \`styles.css\` - стили
- \`script.js\` - основная логика
- \`api.js\` - интеграция с DeepSeek API
- \`test.html\` - тестирование API
- \`data.json\` - полные данные компаний
- \`data-mini.json\` - мини-данные для API

## 🔧 Технологии

- HTML5, CSS3, JavaScript (ES6+)
- DeepSeek AI API
- GitHub Pages

## 📝 Лицензия

MIT
`;

fs.writeFileSync(path.join(distDir, 'README.md'), readmeContent);
console.log('✅ Создан README.md');

console.log('🎉 Сборка завершена! Файлы готовы в папке dist/');
