/**
 * Shared Configuration and Utility Functions for Stadtranderholung Application
 * This file contains centralized configuration and common utilities used across all pages
 * 
 * Usage: Include this file before other scripts in each HTML page:
 * <script src="config.js"></script>
 * 
 * @version 1.0.0
 * @author Software Architect
 * @created 2025-07-26
 */

/**
 * Global Application Configuration
 * Centralized configuration object for all application settings
 */
window.SR_CONFIG = {
    // JSONBin.io API Configuration
    API: {
        BASE_URL: 'https://api.jsonbin.io/v3/b',
        BIN_ID: '68834e6e7b4b8670d8a712d0',
        MASTER_KEY: '$2a$10$Yxp3iL9EqLkbpNRwKv0et.hXwFYAtyN3wkFpYhkyiCmD8riOLllqm',
        ACCESS_KEY: '$2a$10$25EbEOOZQFXGw/T2PkMKm.EELC/3G9sFCI7TNaAxpkawvjEUhAYCu',
        TIMEOUT: 30000 // 30 seconds timeout for API requests
    },
    
    // Application Settings
    APP: {
        TOTAL_GROUPS: 15, // Total number of groups (1-15)
        AUTO_REFRESH_INTERVAL: 10000, // 10 seconds for admin overview
        GROUP_REFRESH_INTERVAL: 30000, // 30 seconds for group pages
        MAX_CHILDREN_PER_GROUP: 20, // Maximum children per group
        MIN_CHILDREN_PER_GROUP: 0, // Minimum children per group
        APPLICATION_NAME: 'Stadtranderholung 2025',
        VERSION: '1.0.0'
    },
    
    // UI Configuration
    UI: {
        ALERT_AUTO_HIDE_DELAY: 5000, // Auto-hide success alerts after 5 seconds
        LOADING_DELAY: 1000, // Minimum loading time for UX
        REDIRECT_DELAY: 1000, // Delay before redirects
        ANIMATION_DURATION: 300 // CSS animation duration in ms
    },
    
    // Local Storage Keys
    STORAGE_KEYS: {
        BETREUER_NAME: 'betreuer_name',
        CHILDREN_PREFIX: 'group_', // Will be: group_{groupNumber}_children_{date}
        APP_SETTINGS: 'sr_app_settings',
        OFFLINE_DATA: 'sr_offline_data'
    },
    
    // Date and Time Configuration
    DATE_TIME: {
        LOCALE: 'de-DE',
        DATE_FORMAT: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        },
        TIME_FORMAT: {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }
    }
};

/**
 * JSONBin API Manager Class
 * Handles all interactions with JSONBin.io API with proper error handling and retry logic
 */
window.JSONBinAPI = class JSONBinAPI {
    constructor(config = window.SR_CONFIG.API) {
        this.config = config;
        this.headers = {
            'Content-Type': 'application/json',
            'X-Master-Key': config.MASTER_KEY,
            'X-Access-Key': config.ACCESS_KEY
        };
        this.retryAttempts = 3;
        this.retryDelay = 1000; // 1 second
    }

    /**
     * Fetch current data from JSONBin with retry logic
     * @returns {Promise<Object>} Current data structure or empty object
     */
    async getData() {
        for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.config.TIMEOUT);
                
                const response = await fetch(`${this.config.BASE_URL}/${this.config.BIN_ID}/latest`, {
                    method: 'GET',
                    headers: this.headers,
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                console.log(`✓ Data fetched successfully (attempt ${attempt})`);
                return result.record || {};
                
            } catch (error) {
                console.warn(`⚠ Fetch attempt ${attempt} failed:`, error.message);
                
                if (attempt === this.retryAttempts) {
                    console.error('❌ All fetch attempts failed');
                    throw new Error(`Failed to fetch data after ${this.retryAttempts} attempts: ${error.message}`);
                }
                
                // Wait before retry
                await this.delay(this.retryDelay * attempt);
            }
        }
    }

    /**
     * Update data in JSONBin with retry logic
     * @param {Object} data - Complete data structure to save
     * @returns {Promise<boolean>} Success status
     */
    async updateData(data) {
        for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.config.TIMEOUT);
                
                const response = await fetch(`${this.config.BASE_URL}/${this.config.BIN_ID}`, {
                    method: 'PUT',
                    headers: this.headers,
                    body: JSON.stringify(data),
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                console.log(`✓ Data updated successfully (attempt ${attempt})`);
                return true;
                
            } catch (error) {
                console.warn(`⚠ Update attempt ${attempt} failed:`, error.message);
                
                if (attempt === this.retryAttempts) {
                    console.error('❌ All update attempts failed');
                    throw new Error(`Failed to update data after ${this.retryAttempts} attempts: ${error.message}`);
                }
                
                // Wait before retry
                await this.delay(this.retryDelay * attempt);
            }
        }
    }

    /**
     * Check API connectivity
     * @returns {Promise<boolean>} Connection status
     */
    async checkConnectivity() {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout for connectivity check
            
            const response = await fetch(`${this.config.BASE_URL}/${this.config.BIN_ID}/latest`, {
                method: 'HEAD', // Use HEAD request for connectivity check
                headers: this.headers,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            return response.ok;
            
        } catch (error) {
            console.warn('⚠ Connectivity check failed:', error.message);
            return false;
        }
    }

    /**
     * Utility method for delays
     * @param {number} ms - Milliseconds to delay
     * @returns {Promise<void>}
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

/**
 * Shared Utility Functions
 * Common utility functions used across all application pages
 */
window.SR_Utils = {
    /**
     * Get current date in YYYY-MM-DD format
     * @returns {string} Formatted date string
     */
    getCurrentDate() {
        return new Date().toISOString().split('T')[0];
    },

    /**
     * Get current timestamp in ISO format
     * @returns {string} ISO timestamp
     */
    getCurrentTimestamp() {
        return new Date().toISOString();
    },

    /**
     * Format date for display using German locale
     * @param {string} dateString - Date in YYYY-MM-DD format
     * @returns {string} Formatted date string
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString(
            window.SR_CONFIG.DATE_TIME.LOCALE,
            window.SR_CONFIG.DATE_TIME.DATE_FORMAT
        );
    },

    /**
     * Format time for display using German locale
     * @param {Date|string} dateTime - Date object or ISO string
     * @returns {string} Formatted time string
     */
    formatTime(dateTime) {
        const date = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;
        return date.toLocaleTimeString(
            window.SR_CONFIG.DATE_TIME.LOCALE,
            window.SR_CONFIG.DATE_TIME.TIME_FORMAT
        );
    },

    /**
     * Get URL parameter by name
     * @param {string} name - Parameter name
     * @returns {string|null} Parameter value or null
     */
    getURLParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },

    /**
     * Generate UUID for unique identifiers
     * @returns {string} UUID string
     */
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    /**
     * Validate group number
     * @param {string|number} groupNumber - Group number to validate
     * @returns {boolean} Valid status
     */
    isValidGroupNumber(groupNumber) {
        const num = parseInt(groupNumber);
        return !isNaN(num) && num >= 1 && num <= window.SR_CONFIG.APP.TOTAL_GROUPS;
    },

    /**
     * Validate child count
     * @param {number} count - Child count to validate
     * @returns {boolean} Valid status
     */
    isValidChildCount(count) {
        return !isNaN(count) && 
               count >= window.SR_CONFIG.APP.MIN_CHILDREN_PER_GROUP && 
               count <= window.SR_CONFIG.APP.MAX_CHILDREN_PER_GROUP;
    },

    /**
     * Sanitize input string to prevent XSS
     * @param {string} input - Input string to sanitize
     * @returns {string} Sanitized string
     */
    sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .trim();
    },

    /**
     * Debounce function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Show alert message to user with auto-hide functionality
     * @param {string} message - Message to display
     * @param {string} type - Alert type (success, danger, warning, info)
     * @param {string} containerId - ID of alert container (default: 'alertContainer')
     * @param {boolean} autoHide - Whether to auto-hide success alerts
     */
    showAlert(message, type = 'info', containerId = 'alertContainer', autoHide = true) {
        const alertContainer = document.getElementById(containerId);
        if (!alertContainer) {
            console.warn(`Alert container '${containerId}' not found`);
            return;
        }

        const alertId = 'alert-' + this.generateUUID();
        const alertHtml = `
            <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show" role="alert">
                <i class="fas fa-${this.getAlertIcon(type)} me-2"></i>
                ${this.sanitizeInput(message)}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        
        alertContainer.innerHTML = alertHtml;

        // Auto-hide success alerts
        if (autoHide && type === 'success') {
            setTimeout(() => {
                const alertElement = document.getElementById(alertId);
                if (alertElement && typeof bootstrap !== 'undefined') {
                    const bsAlert = new bootstrap.Alert(alertElement);
                    bsAlert.close();
                }
            }, window.SR_CONFIG.UI.ALERT_AUTO_HIDE_DELAY);
        }
    },

    /**
     * Get icon class name for alert type
     * @param {string} type - Alert type
     * @returns {string} Icon class name
     */
    getAlertIcon(type) {
        const icons = {
            success: 'check-circle',
            danger: 'exclamation-triangle',
            warning: 'exclamation-circle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    },

    /**
     * Set button loading state with standardized behavior
     * @param {HTMLElement} button - Button element
     * @param {boolean} loading - Loading state
     * @param {string} loadingText - Text to show during loading
     * @param {string} originalText - Original button text
     */
    setButtonLoading(button, loading, loadingText = 'Lädt...', originalText = '') {
        if (!button) return;

        const spinner = button.querySelector('.loading-spinner');
        const buttonText = button.querySelector('.button-text');
        
        if (loading) {
            if (spinner) spinner.style.display = 'inline-block';
            if (buttonText) buttonText.textContent = loadingText;
            button.disabled = true;
            button.classList.add('loading');
        } else {
            if (spinner) spinner.style.display = 'none';
            if (buttonText) buttonText.textContent = originalText;
            button.disabled = false;
            button.classList.remove('loading');
        }
    },

    /**
     * Local Storage Manager with error handling
     */
    storage: {
        /**
         * Get item from localStorage with error handling
         * @param {string} key - Storage key
         * @param {any} defaultValue - Default value if key doesn't exist
         * @returns {any} Stored value or default
         */
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                console.warn(`⚠ Error reading from localStorage (${key}):`, error);
                return defaultValue;
            }
        },

        /**
         * Set item in localStorage with error handling
         * @param {string} key - Storage key
         * @param {any} value - Value to store
         * @returns {boolean} Success status
         */
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.warn(`⚠ Error writing to localStorage (${key}):`, error);
                return false;
            }
        },

        /**
         * Remove item from localStorage
         * @param {string} key - Storage key
         * @returns {boolean} Success status
         */
        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                console.warn(`⚠ Error removing from localStorage (${key}):`, error);
                return false;
            }
        },

        /**
         * Clear all application-related localStorage items
         * @returns {boolean} Success status
         */
        clearAll() {
            try {
                const keys = Object.keys(localStorage);
                const appKeys = keys.filter(key => 
                    key.startsWith('sr_') || 
                    key.startsWith('group_') || 
                    key === window.SR_CONFIG.STORAGE_KEYS.BETREUER_NAME
                );
                
                appKeys.forEach(key => localStorage.removeItem(key));
                console.log(`✓ Cleared ${appKeys.length} application storage items`);
                return true;
            } catch (error) {
                console.warn('⚠ Error clearing localStorage:', error);
                return false;
            }
        }
    },

    /**
     * Network connectivity checker
     */
    network: {
        /**
         * Check if browser is online
         * @returns {boolean} Online status
         */
        isOnline() {
            return navigator.onLine;
        },

        /**
         * Add network event listeners
         * @param {Function} onOnline - Callback for online event
         * @param {Function} onOffline - Callback for offline event
         */
        addEventListeners(onOnline, onOffline) {
            window.addEventListener('online', onOnline);
            window.addEventListener('offline', onOffline);
        },

        /**
         * Remove network event listeners
         * @param {Function} onOnline - Callback for online event
         * @param {Function} onOffline - Callback for offline event
         */
        removeEventListeners(onOnline, onOffline) {
            window.removeEventListener('online', onOnline);
            window.removeEventListener('offline', onOffline);
        }
    }
};

/**
 * Application Logger
 * Centralized logging system with different log levels
 */
window.SR_Logger = {
    /**
     * Log levels
     */
    LEVELS: {
        ERROR: 0,
        WARN: 1,
        INFO: 2,
        DEBUG: 3
    },

    currentLevel: 2, // INFO level by default

    /**
     * Set log level
     * @param {number} level - Log level
     */
    setLevel(level) {
        this.currentLevel = level;
    },

    /**
     * Log error message
     * @param {string} message - Error message
     * @param {any} data - Additional data
     */
    error(message, data = null) {
        if (this.currentLevel >= this.LEVELS.ERROR) {
            console.error(`❌ [SR ERROR] ${message}`, data);
        }
    },

    /**
     * Log warning message
     * @param {string} message - Warning message
     * @param {any} data - Additional data
     */
    warn(message, data = null) {
        if (this.currentLevel >= this.LEVELS.WARN) {
            console.warn(`⚠ [SR WARN] ${message}`, data);
        }
    },

    /**
     * Log info message
     * @param {string} message - Info message
     * @param {any} data - Additional data
     */
    info(message, data = null) {
        if (this.currentLevel >= this.LEVELS.INFO) {
            console.log(`ℹ [SR INFO] ${message}`, data);
        }
    },

    /**
     * Log debug message
     * @param {string} message - Debug message
     * @param {any} data - Additional data
     */
    debug(message, data = null) {
        if (this.currentLevel >= this.LEVELS.DEBUG) {
            console.log(`🔍 [SR DEBUG] ${message}`, data);
        }
    }
};

/**
 * Initialize shared configuration when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    window.SR_Logger.info('Shared configuration initialized', {
        version: window.SR_CONFIG.APP.VERSION,
        totalGroups: window.SR_CONFIG.APP.TOTAL_GROUPS,
        isOnline: window.SR_Utils.network.isOnline()
    });
});

/**
 * Global error handler for unhandled errors
 */
window.addEventListener('error', function(event) {
    window.SR_Logger.error('Unhandled error occurred', {
        message: event.error?.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
    });
});

/**
 * Global handler for unhandled promise rejections
 */
window.addEventListener('unhandledrejection', function(event) {
    window.SR_Logger.error('Unhandled promise rejection', {
        reason: event.reason,
        promise: event.promise
    });
});

console.log('✅ Stadtranderholung shared configuration loaded successfully');