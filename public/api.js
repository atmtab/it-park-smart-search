// API DeepSeek для поиска компаний
class DeepSeekAPI {
  constructor(apiKey = 'sk-a6d23ddc253540ba8d0b4ca0ebb95ef0') {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.deepseek.com/v1/chat/completions';
    this.isAvailable = true; // Флаг доступности API
  }

  async searchCompanies(query, miniData) {
    try {
      // Проверяем доступность API
      if (!this.isAvailable) {
        console.log('🔄 API недоступен, используем fallback поиск');
        return this.fallbackSearch(query, miniData);
      }

      const prompt = this.buildPrompt(query, miniData);
      
      console.log('🔍 Отправка запроса к DeepSeek API...');
      console.log('📝 Запрос:', query);
      console.log('🌐 URL:', this.baseURL);
      console.log('🔑 API Key:', this.apiKey ? '***' + this.apiKey.slice(-4) : 'НЕ УСТАНОВЛЕН');
      
      const requestBody = {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'Ты - помощник по поиску IT-компаний. Анализируй запросы и находи подходящие компании из базы данных. Отвечай кратко и по существу.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.3
      };
      
      console.log('📤 Request Body:', JSON.stringify(requestBody, null, 2));
      
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      console.log('📡 HTTP Status:', response.status);
      console.log('📡 HTTP Status Text:', response.statusText);
      console.log('📡 Response Headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ HTTP Error Response:', errorText);
        throw new Error(`API Error: ${response.status} - ${response.statusText}. Response: ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Ответ от DeepSeek API получен');
      console.log('📄 Response Data:', JSON.stringify(data, null, 2));
      
      return this.parseResponse(data, miniData);
    } catch (error) {
      console.error('❌ DeepSeek API Error:', error);
      console.error('🔍 Тип ошибки:', error.name);
      console.error('🔍 Сообщение:', error.message);
      console.error('🔍 Stack:', error.stack);
      
      // Если API недоступен, используем fallback
      this.isAvailable = false;
      console.log('🔄 Переключение на локальный поиск...');
      
      return this.fallbackSearch(query, miniData);
    }
  }

  // Fallback поиск при недоступности API
  fallbackSearch(query, miniData) {
    console.log('🔍 Выполнение локального поиска...');
    
    const normalizedQuery = query.toLowerCase();
    const results = [];
    
    // Простой поиск по ключевым словам
    miniData.companies.forEach(company => {
      let score = 0;
      
      // Поиск по названию
      if (company.name.toLowerCase().includes(normalizedQuery)) {
        score += 3;
      }
      
      // Поиск по секторам
      company.sectors.forEach(sector => {
        const sectorName = miniData.sector_mapping[sector] || sector;
        if (sectorName.toLowerCase().includes(normalizedQuery)) {
          score += 2;
        }
      });
      
      // Поиск по ответственному
      const focalName = miniData.focal_mapping[company.focal] || company.focal;
      if (focalName.toLowerCase().includes(normalizedQuery)) {
        score += 4;
      }
      
      // Поиск по рейтингу
      if (company.rating.toLowerCase().includes(normalizedQuery)) {
        score += 1;
      }
      
      if (score > 0) {
        results.push({ company, score });
      }
    });
    
    // Сортируем по релевантности
    results.sort((a, b) => b.score - a.score);
    
    const companies = results.map(r => this.getFullCompanyData([r.company.id], miniData)[0]).filter(Boolean);
    
    return {
      text: `Найдено ${companies.length} компаний по запросу "${query}". Поиск выполнен локально (API DeepSeek недоступен).`,
      companies: companies
    };
  }

  buildPrompt(query, miniData) {
    const companiesText = miniData.companies.map(company => 
      `ID: ${company.id}, Название: ${company.name}, Секторы: ${company.sectors.join(', ')}, Статус: ${company.status}, Ответственный: ${company.focal}, Рейтинг: ${company.rating}`
    ).join('\n');

    return `Запрос пользователя: "${query}"

База данных компаний:
${companiesText}

Секторы (расшифровка):
${Object.entries(miniData.sector_mapping).map(([key, value]) => `${key} = ${value}`).join(', ')}

Ответственные лица:
${Object.entries(miniData.focal_mapping).map(([key, value]) => `${key} = ${value}`).join(', ')}

Задача: Проанализируй запрос и найди подходящие компании. Верни ответ в формате JSON:
{
  "text": "Краткий текстовый ответ на запрос",
  "company_ids": [список ID подходящих компаний]
}

Текст должен быть кратким (2-3 предложения) и объяснять, почему выбраны эти компании.`;
  }

  parseResponse(apiResponse, miniData) {
    try {
      const content = apiResponse.choices[0]?.message?.content;
      if (!content) {
        throw new Error('Пустой ответ от API');
      }

      console.log('📄 Ответ API:', content);

      // Ищем JSON в ответе
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('JSON не найден в ответе');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      console.log('✅ JSON успешно распарсен:', parsed);
      
      // Получаем полные данные компаний по ID
      const companies = this.getFullCompanyData(parsed.company_ids || [], miniData);
      
      return {
        text: parsed.text || 'Компании найдены',
        companies: companies
      };
    } catch (error) {
      console.error('❌ Parse Error:', error);
      throw new Error(`Ошибка при обработке ответа API: ${error.message}`);
    }
  }

  getFullCompanyData(companyIds, miniData) {
    // Получаем полные данные из основного файла
    return companyIds.map(id => {
      const company = miniData.companies.find(c => c.id === id);
      if (company) {
        // Создаем объект с полными данными на основе мини-данных
        return {
          id: company.id,
          name: `OOO «${company.name}»`,
          sector: company.sectors.map(s => miniData.sector_mapping[s] || s),
          status: company.status,
          region: company.status === 'resident' ? 'Резидент IT-Park с 03.12.2019' : 'Лид • Заявка на рассмотрении',
          contact: '+998XXXXXXXXX',
          extra: `Рейтинг устойчивости: ${company.rating}`,
          focal: miniData.focal_mapping[company.focal] || company.focal
        };
      }
      return null;
    }).filter(Boolean);
  }

  // Метод для проверки доступности API
  async checkAvailability() {
    try {
      console.log('🔍 Проверка доступности DeepSeek API...');
      console.log('🌐 URL:', this.baseURL);
      console.log('🔑 API Key:', this.apiKey ? '***' + this.apiKey.slice(-4) : 'НЕ УСТАНОВЛЕН');
      
      // Используем POST запрос вместо HEAD для более надежной проверки
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'user',
              content: 'test'
            }
          ],
          max_tokens: 5
        })
      });
      
      console.log('📡 HTTP Status:', response.status);
      console.log('📡 HTTP Status Text:', response.statusText);
      
      this.isAvailable = response.ok;
      
      if (response.ok) {
        console.log('✅ DeepSeek API доступен');
      } else {
        console.log('❌ DeepSeek API недоступен. Status:', response.status);
      }
      
      return this.isAvailable;
    } catch (error) {
      console.error('❌ Ошибка при проверке DeepSeek API:', error);
      console.error('🔍 Тип ошибки:', error.name);
      console.error('🔍 Сообщение:', error.message);
      
      this.isAvailable = false;
      return false;
    }
  }
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DeepSeekAPI;
} else {
  window.DeepSeekAPI = DeepSeekAPI;
}
