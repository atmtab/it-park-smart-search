const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.get('/api/companies', (req, res) => {
  try {
    const companiesData = fs.readFileSync(path.join(__dirname, 'data', 'data.json'), 'utf8');
    res.json(JSON.parse(companiesData));
  } catch (error) {
    console.error('❌ Ошибка загрузки данных компаний:', error);
    res.status(500).json({ error: 'Ошибка загрузки данных компаний' });
  }
});

app.get('/api/companies-mini', (req, res) => {
  try {
    const miniData = fs.readFileSync(path.join(__dirname, 'data', 'data-mini.json'), 'utf8');
    res.json(JSON.parse(miniData));
  } catch (error) {
    console.error('❌ Ошибка загрузки мини-данных:', error);
    res.status(500).json({ error: 'Ошибка загрузки мини-данных' });
  }
});

// Search API endpoint
app.post('/api/search', async (req, res) => {
  try {
    const { query, mode } = req.body;
    
    if (!query || !mode) {
      return res.status(400).json({ error: 'Необходимы параметры query и mode' });
    }

    // Здесь можно добавить логику поиска
    // Пока возвращаем заглушку
    res.json({
      success: true,
      message: `Поиск выполнен для запроса: "${query}" в режиме: ${mode}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка выполнения поиска' });
  }
});

// Health check endpoint для Render
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'IT Park Smart Search API работает'
  });
});

// Test DeepSeek API endpoint
app.post('/api/test-deepseek', async (req, res) => {
  try {
    const apiKey = 'sk-a6d23ddc253540ba8d0b4ca0ebb95ef0';
    
    console.log('🧪 Тестирование DeepSeek API...');
    
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: 'Привет'
          }
        ],
        max_tokens: 10
      })
    });
    
    console.log('📡 DeepSeek API Response Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ DeepSeek API работает!');
      res.json({
        success: true,
        message: 'DeepSeek API работает!',
        data: data
      });
    } else {
      const errorText = await response.text();
      console.log('❌ DeepSeek API не работает:', response.status, errorText);
      res.json({
        success: false,
        message: `DeepSeek API не работает. Status: ${response.status}`,
        error: errorText
      });
    }
    
  } catch (error) {
    console.error('❌ Ошибка тестирования DeepSeek API:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при тестировании DeepSeek API',
      error: error.message
    });
  }
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve test API page
app.get('/test-api', (req, res) => {
  res.sendFile(path.join(__dirname, 'test-api.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 IT Park Smart Search сервер запущен на порту ${PORT}`);
  console.log(`📁 Статические файлы: ${path.join(__dirname, 'public')}`);
  console.log(`🔍 API доступен по адресу: http://localhost:${PORT}/api`);
  console.log(`🧪 Тест API: http://localhost:${PORT}/test-api`);
  console.log(`📊 Основное приложение: http://localhost:${PORT}/`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Получен сигнал SIGTERM, завершаем работу...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Получен сигнал SIGINT, завершаем работу...');
  process.exit(0);
});
