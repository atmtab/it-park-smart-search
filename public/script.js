// Основной скрипт приложения
class SmartSearchApp {
  constructor() {
    this.apiKey = 'sk-a6d23ddc253540ba8d0b4ca0ebb95ef0';
    this.deepSeekAPI = new DeepSeekAPI(this.apiKey);
    this.companies = [];
    this.miniData = {};
    this.mode = 'ai';
    this.activeTags = new Set();
    
    this.init();
  }

  async init() {
    try {
      console.log('🚀 Инициализация SmartSearchApp...');
      
      // Загружаем данные через API
      await this.loadData();
      
      // Инициализируем UI
      this.initUI();
      
      // Привязываем события
      this.bindEvents();
      
      // Рендерим начальное состояние
      this.renderChips();
      
      // Проверяем доступность DeepSeek API
      await this.checkAPI();
      
      console.log('✅ Приложение успешно инициализировано');
    } catch (error) {
      console.error('❌ Ошибка инициализации:', error);
      this.showError('Ошибка загрузки данных');
    }
  }

  async loadData() {
    try {
      console.log('📥 Загрузка данных...');
      
      // Загружаем данные напрямую из JSON файлов (для GitHub Pages)
      const fullDataResponse = await fetch('./data.json');
      if (!fullDataResponse.ok) {
        throw new Error(`HTTP ${fullDataResponse.status}: ${fullDataResponse.statusText}`);
      }
      const fullData = await fullDataResponse.json();
      this.companies = fullData.companies;
      console.log(`✅ Загружено ${this.companies.length} компаний`);

      const miniDataResponse = await fetch('./data-mini.json');
      if (!miniDataResponse.ok) {
        throw new Error(`HTTP ${miniDataResponse.status}: ${miniDataResponse.statusText}`);
      }
      const miniData = await miniDataResponse.json();
      this.miniData = miniData;
      console.log(`✅ Загружено ${Object.keys(miniData.sector_mapping).length} секторов и ${Object.keys(miniData.focal_mapping).length} ответственных`);
      
    } catch (error) {
      console.error('❌ Ошибка загрузки данных:', error);
      throw error;
    }
  }

  async checkAPI() {
    try {
      console.log('🔍 Проверка доступности DeepSeek API...');
      const isAvailable = await this.deepSeekAPI.checkAvailability();
      if (isAvailable) {
        console.log('✅ DeepSeek API доступен');
      } else {
        console.log('⚠️ DeepSeek API недоступен, будет использован локальный поиск');
      }
    } catch (error) {
      console.log('⚠️ Не удалось проверить DeepSeek API:', error.message);
    }
  }

  initUI() {
    // Получаем элементы DOM
    this.chipsEl = document.getElementById('chips');
    this.colsEl = document.getElementById('cards');
    this.aiBox = document.getElementById('aiBox');
    this.aiText = document.getElementById('aiText');
    this.qEl = document.getElementById('q');
    this.runBtn = document.getElementById('run');
    this.resetBtn = document.getElementById('reset');
    this.placeholderEl = document.getElementById('placeholder');
    this.modeAIEl = document.getElementById('mode-ai');
    this.modeFiltersEl = document.getElementById('mode-filters');
    
    console.log('✅ UI элементы инициализированы');
  }

  bindEvents() {
    // Обработчики кнопок
    this.runBtn.onclick = () => this.runSearch();
    this.resetBtn.onclick = () => this.resetAll();
    
    // Обработчик Enter в поле поиска
    this.qEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.runSearch();
    });

    // Переключение режимов
    this.modeAIEl.onclick = () => this.switchMode('ai');
    this.modeFiltersEl.onclick = () => this.switchMode('filters');
    
    console.log('✅ События привязаны');
  }

  switchMode(newMode) {
    this.mode = newMode;
    console.log(`🔄 Переключение на режим: ${newMode}`);
    
    if (newMode === 'ai') {
      this.modeAIEl.classList.add('active');
      this.modeFiltersEl.classList.remove('active');
      this.chipsEl.style.display = 'none';
    } else {
      this.modeFiltersEl.classList.add('active');
      this.modeAIEl.classList.remove('active');
      this.chipsEl.style.display = 'flex';
    }
  }

  renderChips() {
    if (!this.companies.length) return;
    
    this.chipsEl.innerHTML = '';
    const allTags = Array.from(new Set(this.companies.flatMap(r => r.sector))).sort();
    
    allTags.forEach(tag => {
      const button = document.createElement('button');
      button.className = 'chip';
      button.textContent = tag;
      button.onclick = () => {
        if (this.activeTags.has(tag)) {
          this.activeTags.delete(tag);
          button.classList.remove('active');
        } else {
          this.activeTags.add(tag);
          button.classList.add('active');
        }
        
        if (this.mode === 'filters') {
          this.runSearch();
        }
      };
      this.chipsEl.appendChild(button);
    });
    
    console.log(`✅ Отрендерено ${allTags.length} тегов`);
  }

  residencyPillClass(status) {
    return status === 'lead' ? 'pill blue' : 'pill green';
  }

  cardTemplate(company) {
    return `
      <div class="card">
        <div class="fp-badge">Focal: ${company.focal}</div>
        <div class="row">
          <div class="title">${company.name}</div>
          <span class="${this.residencyPillClass(company.status)}">${company.region}</span>
        </div>
        <div class="row">
          ${company.sector.map(s => `<span class="tag">${s}</span>`).join('')}
        </div>
        <div style="color:#64748b">
          ${company.extra} • Контакт: ${company.contact}
        </div>
      </div>
    `;
  }

  renderSkeletons() {
    this.colsEl.style.display = 'grid';
    this.colsEl.innerHTML = '';
    
    for (let i = 0; i < 4; i++) {
      this.colsEl.innerHTML += `
        <div class="card">
          <div class="skeleton" style="height:18px;width:60%"></div>
          <div class="skeleton" style="height:12px;width:90%"></div>
          <div class="skeleton" style="height:12px;width:70%"></div>
        </div>
      `;
    }
  }

  showLoading() {
    this.colsEl.style.display = 'grid';
    this.colsEl.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        <span>Поиск компаний...</span>
      </div>
    `;
  }

  showError(message) {
    this.colsEl.style.display = 'grid';
    this.colsEl.innerHTML = `
      <div class="error">
        <strong>Ошибка:</strong> ${message}
      </div>
    `;
  }

  async typewrite(targetEl, text, speed = 16) {
    targetEl.textContent = '';
    let i = 0;
    
    return new Promise(resolve => {
      const timer = setInterval(() => {
        targetEl.textContent += text[i++] || '';
        if (i >= text.length) {
          clearInterval(timer);
          resolve();
        }
      }, speed);
    });
  }

  // Поиск с использованием API DeepSeek
  async searchWithAI(query) {
    try {
      console.log(`🔍 AI поиск для запроса: "${query}"`);
      this.showLoading();
      
      // Вызываем API DeepSeek
      const result = await this.deepSeekAPI.searchCompanies(query, this.miniData);
      
      console.log(`✅ AI поиск завершен. Найдено: ${result.companies.length} компаний`);
      
      // Показываем AI ответ
      this.aiBox.style.display = '';
      await this.typewrite(this.aiText, result.text);
      
      // Отображаем найденные компании
      if (result.companies && result.companies.length > 0) {
        this.colsEl.innerHTML = result.companies.map(company => this.cardTemplate(company)).join('');
      } else {
        this.colsEl.innerHTML = '<div class="placeholder">Ничего не найдено</div>';
      }
      
      return result.companies;
    } catch (error) {
      console.error('❌ Ошибка AI поиска:', error);
      this.showError(`Ошибка при поиске с AI: ${error.message}`);
      return [];
    }
  }

  // Поиск по фильтрам (локальный)
  searchByFilters(query) {
    console.log(`🔍 Фильтрованный поиск для запроса: "${query}"`);
    
    let filteredCompanies = this.companies;
    
    // Фильтр по тегам
    if (this.activeTags.size > 0) {
      filteredCompanies = filteredCompanies.filter(company => 
        [...this.activeTags].every(tag => company.sector.includes(tag))
      );
      console.log(`📊 Фильтр по тегам: ${this.activeTags.size} активных тегов`);
    }
    
    // Фильтр по тексту
    if (query.trim()) {
      const normalizedQuery = this.normalize(query);
      filteredCompanies = filteredCompanies.filter(company => {
        const searchText = this.normalize([
          company.name,
          company.region,
          company.contact,
          company.extra,
          company.focal,
          company.sector.join(' ')
        ].join(' '));
        
        return searchText.includes(normalizedQuery);
      });
    }
    
    console.log(`✅ Фильтрованный поиск завершен. Найдено: ${filteredCompanies.length} компаний`);
    return filteredCompanies;
  }

  normalize(text) {
    return (text || '').toString().toLowerCase().replace('ё', 'е');
  }

  async runSearch() {
    const query = this.qEl.value || '';
    console.log(`🚀 Запуск поиска. Запрос: "${query}", Режим: ${this.mode}`);
    
    this.placeholderEl.style.display = 'none';
    
    if (this.mode === 'ai') {
      this.chipsEl.style.display = 'none';
      await this.searchWithAI(query);
    } else {
      this.chipsEl.style.display = 'flex';
      this.aiBox.style.display = 'none';
      
      this.renderSkeletons();
      
      // Имитируем задержку для плавности
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const items = this.searchByFilters(query);
      this.colsEl.innerHTML = items.length > 0 
        ? items.map(company => this.cardTemplate(company)).join('')
        : '<div class="placeholder">Ничего не найдено</div>';
    }
  }

  resetAll() {
    console.log('🔄 Сброс всех данных');
    
    this.qEl.value = '';
    this.activeTags.clear();
    
    // Сбрасываем активные теги
    Array.from(this.chipsEl.querySelectorAll('.chip')).forEach(chip => 
      chip.classList.remove('active')
    );
    
    // Скрываем результаты
    this.colsEl.style.display = 'none';
    this.colsEl.innerHTML = '';
    
    // Скрываем AI ответ
    this.aiText.textContent = '';
    this.aiBox.style.display = 'none';
    
    // Показываем placeholder
    this.placeholderEl.style.display = 'block';
  }
}

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  console.log('🌐 DOM загружен, инициализация приложения...');
  new SmartSearchApp();
});
