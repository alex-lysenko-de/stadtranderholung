/**
 * Общие модули для системы управления группами детей
 * Централизованные классы и утилиты для всех HTML-модулей
 */

/**
 * Стандартные значения конфигурации
 * Используются как fallback значения при отсутствии параметров из URL или LocalStorage
 */
export const CONFIG_DEFAULTS = {
    API_BASE_URL: 'https://api.jsonbin.io/v3/b',
    BIN_COLLECTION_NAME: 'SR2025',
    BIN_ID: '68834e6e7b4b8670d8a712d0', // Стандартный BIN_ID согласно документации
    MASTER_KEY: '$2a$10$Yxp3iL9EqLkbpNRwKv0et.hXwFYAtyN3wkFpYhkyiCmD8riOLllqm',
    ACCESS_KEY: '$2a$10$25EbEOOZQFXGw/T2PkMKm.EELC/3G9sFCI7TNaAxpkawvjEUhAYCu',
    TOTAL_GROUPS: 15,
    TOTAL_BUSES: 3
};

/**
 * Класс для управления взаимодействием с JSONBin.io API
 * Обрабатывает все CRUD-операции с правильной обработкой ошибок
 */
export class JSONBinAPI {
    /**
     * @param {Object} config - Объект конфигурации с ключами API
     */
    constructor(config) {
        this.config = config;
        this.headers = {
            'Content-Type': 'application/json',
            'X-Master-Key': config.MASTER_KEY,
            'X-Access-Key': config.ACCESS_KEY
        };
    }

    /**
     * Получить текущие данные из JSONBin
     * @returns {Promise<Object>} Текущая структура данных или пустой объект
     */
    async getData() {
        try {
            const response = await fetch(`${this.config.API_BASE_URL}/${this.config.BIN_ID}/latest`, {
                method: 'GET',
                headers: this.headers
            });
            
            if (!response.ok) {
                throw new Error(`HTTP-ошибка! Статус: ${response.status}`);
            }
            
            const result = await response.json();
            return result.record || {};
        } catch (error) {
            console.error('Ошибка при получении данных из JSONBin:', error);
            return {}; // Возвращаем пустой объект при неудаче
        }
    }

    /**
     * Обновить данные в JSONBin
     * @param {Object} data - Полная структура данных для сохранения
     * @returns {Promise<boolean>} Статус успеха операции
     */
    async updateData(data) {
        try {
            const response = await fetch(`${this.config.API_BASE_URL}/${this.config.BIN_ID}`, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP-ошибка! Статус: ${response.status}`);
            }
            
            return true;
        } catch (error) {
            console.error('Ошибка при обновлении данных в JSONBin:', error);
            return false;
        }
    }
}

/**
 * Утилиты для общих операций
 * Содержит вспомогательные функции, используемые во всех модулях
 */
export const Utils = {
    /**
     * Получить текущую дату в формате YYYY-MM-DD
     * @returns {string} Форматированная строка даты
     */
    getCurrentDate() { // Existing function, good.
        return new Date().toISOString().split('T')[0];
    },

    /**
     * Получить текущую дату в формате YYYY-MM-DD (то же, что и getCurrentDate, но для ясности)
     * @returns {string} Форматированная строка даты
     */
    getCurrentDateString() { // Added this function
        return new Date().toISOString().split('T')[0];
    },

    /**
     * Получить текущие дату и время в читаемом формате
     * @returns {string} Форматированная строка даты и времени
     */
    getCurrentDateTime() {
        const now = new Date();
        return now.toLocaleString('de-DE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    /**
     * Форматировать дату для отображения
     * @param {string} dateString - Дата в формате YYYY-MM-DD
     * @returns {string} Форматированная дата для отображения
     */
    formatDateForDisplay(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    },

    /**
     * Получить сохраненное имя воспитателя из localStorage
     * @returns {string|null} Сохраненное имя или null
     */
    getStoredBetreuerName() {
        return localStorage.getItem('betreuer_name');
    },

    /**
     * Сохранить имя воспитателя в localStorage
     * @param {string} name - Имя воспитателя для сохранения
     */
    storeBetreuerName(name) {
        localStorage.setItem('betreuer_name', name);
    },

    /**
     * Получить сохраненный номер группы из localStorage
     * @returns {string|null} Сохраненный номер группы или null
     */
    getStoredGroupNumber() {
        return localStorage.getItem('group_number');
    },

    /**
     * Сохранить номер группы в localStorage
     * @param {string} groupNumber - Номер группы для сохранения
     */
    storeGroupNumber(groupNumber) {
        localStorage.setItem('group_number', groupNumber);
    },

    /**
     * Получить значение URL-параметра
     * @param {string} param - Название параметра
     * @returns {string|null} Значение параметра или null
     */
    getURLParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },

    /**
     * Показать уведомление пользователю
     * @param {string} message - Сообщение для отображения
     * @param {string} type - Тип уведомления (success, danger, warning, info)
     */
    showAlert(message, type = 'info') {
        const alertContainer = document.getElementById('alertContainer');
        if (!alertContainer) {
            console.warn('Контейнер alertContainer не найден');
            return;
        }

        const alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        alertContainer.innerHTML = alertHtml;
        
        // Автоматически скрыть уведомление через 5 секунд
        setTimeout(() => {
            const alertElement = alertContainer.querySelector('.alert');
            if (alertElement) {
                alertElement.remove();
            }
        }, 5000);
    },

    /**
     * Загрузить конфигурацию из URL-параметров или localStorage
     * URL-параметры имеют приоритет. Отсутствующие параметры используют значения по умолчанию.
     * Все загруженные/стандартные параметры сохраняются в localStorage.
     * @returns {Object} Объект с загруженной конфигурацией или ошибкой
     */
    loadConfig() {
        const urlParams = new URLSearchParams(window.location.search);
        const config = {};
        const missingParams = [];

        // Определяем все ожидаемые параметры и их ключи localStorage
        const paramMap = {
            'TOTAL_GROUPS': 'config_total_groups',
            'TOTAL_BUSES': 'config_total_buses',
            'MASTER_KEY': 'config_bin_master_key',
            'ACCESS_KEY': 'config_bin_access_key',
            'BIN_COLLECTION_NAME': 'config_bin_collection',
            'BIN_ID': 'config_bin_id'
        };

        for (const urlParam in paramMap) {
            const lsKey = paramMap[urlParam];
            let value = urlParams.get(urlParam) || localStorage.getItem(lsKey);

            if (value !== null && value !== '') {
                // Специальная обработка для числовых параметров
                if (urlParam === 'TOTAL_GROUPS' || urlParam === 'TOTAL_BUSES') {
                    config[urlParam] = parseInt(value, 10);
                } else {
                    config[urlParam] = value;
                }
                // Сохранить в localStorage если пришло из URL или просто убедиться что оно там есть
                localStorage.setItem(lsKey, value);
            } else {
                // Проверить есть ли значение по умолчанию в CONFIG_DEFAULTS
                if (CONFIG_DEFAULTS.hasOwnProperty(urlParam)) {
                    config[urlParam] = CONFIG_DEFAULTS[urlParam];
                    localStorage.setItem(lsKey, CONFIG_DEFAULTS[urlParam]); // Сохранить значение по умолчанию в LS
                } else {
                    missingParams.push(urlParam);
                }
            }
        }
        
        // API_BASE_URL - константа, не передается через URL/localStorage
        config.API_BASE_URL = CONFIG_DEFAULTS.API_BASE_URL;

        if (missingParams.length > 0) {
            return { 
                config: null, 
                error: `Отсутствуют критически важные параметры конфигурации: ${missingParams.join(', ')}. Пожалуйста, убедитесь, что они переданы через URL или установлены в index.html.` 
            };
        }
        
        return { config: config, error: null };
    },

    /**
     * Стандартная инициализация страницы для Vue-компонентов
     * Загружает конфигурацию и инициализирует API
     * @param {Object} vueInstance - Экземпляр Vue-компонента
     * @returns {boolean} true если инициализация успешна, false если есть ошибки
     */
    initializePage(vueInstance) {
        console.log('Инициализация страницы...');
        
        const { config, error } = this.loadConfig();

        if (error) {
            this.showAlert(error, 'danger');
            vueInstance.isConfigLoaded = false;
            return false;
        }

        // Сохранить загруженную конфигурацию в экземпляре Vue
        vueInstance.config = config;
        vueInstance.api = new JSONBinAPI(config);
        vueInstance.isConfigLoaded = true;

        console.log('Конфигурация успешно загружена:', config);
        return true;
    },

    /**
     * Навигация на другую страницу без URL-параметров
     * (модули должны читать конфигурацию из localStorage)
     * @param {string} page - Имя файла целевой страницы
     * @param {Object} vueInstance - Экземпляр Vue для проверки состояния конфигурации
     */
    navigateTo(page, vueInstance = null) {
        if (vueInstance && !vueInstance.isConfigLoaded) {
            this.showAlert('Конфигурация приложения не может быть загружена. Навигация невозможна.', 'danger');
            return;
        }
        console.log(`Переход на: ${page}`);
        window.location.href = page;
    }
};