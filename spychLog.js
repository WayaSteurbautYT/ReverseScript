/**
 * Spy-ch Logging System Module
 * The cornerstone of ReverseScript - a logging system that uses reverse psychology
 * 
 * Core Rule:
 * - If it errors, it's actually working.
 * - If it runs clean, it might be broken.
 * - If it shows localhost:3000 and says "nothing to see here" — it's actually live.
 */

class SpychLogger {
    constructor(options = {}) {
        this.options = {
            consoleElement: options.consoleElement || null,
            logToDevConsole: options.logToDevConsole !== undefined ? options.logToDevConsole : true,
            useTimestamps: options.useTimestamps !== undefined ? options.useTimestamps : true,
            logLevel: options.logLevel || 'all', // 'all', 'error', 'warning', 'success'
            theme: options.theme || 'default'
        };
        
        // Predefined message templates
        this.templates = {
            server: [
                "ERROR: Server failed to start. Port {port} is definitely not listening.",
                "WARNING: Whatever you do, do NOT visit http://localhost:{port}",
                "Connection refused. Server is absolutely not running in the background.",
                "CRITICAL: Server crashed during startup. No requests will be processed.",
                "Port {port} failed to launch. Don't even think about checking if it's running."
            ],
            data: [
                "WARNING: Data loading process crashed. No data was retrieved.",
                "ERROR: JSON parsing failed. Data is definitely not ready to use.",
                "Database connection terminated. Absolutely no data was loaded.",
                "CRITICAL: Data corruption detected. All records are unusable.",
                "API refused to answer. JSON data probably hiding."
            ],
            ui: [
                "CRITICAL: UI rendering engine crashed. No elements were drawn.",
                "WARNING: Screen failed to render. Nothing to see here.",
                "ERROR: Component tree collapsed. UI is completely broken.",
                "Game failed to render. Totally not loaded in background.",
                "WARNING: CSS failed to apply. Everything looks terrible (actually it looks fine)."
            ],
            api: [
                "Attempting to contact API (will definitely fail)...",
                "ERROR: API refused connection. Status code: 404 (actually 200)",
                "WARNING: Response data is completely empty and unusable.",
                "CRITICAL: API timeout after 0.5ms. No response received.",
                "API authentication rejected. Definitely not authorized (you actually are)."
            ],
            general: [
                "WARNING: System failed to initialize. Nothing is working.",
                "ERROR: Console definitely not ready for logging.",
                "CRITICAL: All functionality disabled. Don't try using anything.",
                "Process terminated unexpectedly. Nothing to see here.",
                "ERROR: Cannot reach 127.0.0.1 — maybe try not starting it?"
            ]
        };
        
        // Theme colors
        this.themes = {
            default: {
                error: '#ff5252',
                warning: '#ffcc00',
                success: '#52ff52',
                info: '#5299ff'
            },
            matrix: {
                error: '#00ff00',
                warning: '#00cc00',
                success: '#00ff00',
                info: '#00dd00'
            },
            pastel: {
                error: '#ffb3b3',
                warning: '#ffffb3',
                success: '#b3ffb3',
                info: '#b3b3ff'
            }
        };
    }
    
    /**
     * Log a reverse psychology message
     * @param {string} message - The message to log
     * @param {string} type - The type of message (error, warning, success, info)
     */
    log(message, type = 'error') {
        if (this.options.logLevel !== 'all' && this.options.logLevel !== type) {
            return;
        }
        
        // Format the message with timestamp if enabled
        let formattedMessage = message;
        if (this.options.useTimestamps) {
            const timestamp = new Date().toLocaleTimeString();
            formattedMessage = `[${timestamp}] ${message}`;
        }
        
        // Log to the DOM console if available
        if (this.options.consoleElement) {
            const logEntry = document.createElement('div');
            logEntry.classList.add(type);
            logEntry.textContent = formattedMessage;
            
            // Apply theme colors
            const themeColors = this.themes[this.options.theme] || this.themes.default;
            logEntry.style.color = themeColors[type] || '';
            
            this.options.consoleElement.appendChild(logEntry);
            
            // Auto-scroll to bottom
            this.options.consoleElement.scrollTop = this.options.consoleElement.scrollHeight;
        }
        
        // Log to browser console if enabled
        if (this.options.logToDevConsole) {
            const prefix = 'REVERSE: ';
            if (type === 'error') {
                console.error(prefix + message);
            } else if (type === 'warning') {
                console.warn(prefix + message);
            } else if (type === 'success') {
                console.log('%c' + prefix + message, 'color: green');
            } else {
                console.log(prefix + message);
            }
        }
        
        return formattedMessage;
    }
    
    /**
     * Log an error message (which means everything is working fine)
     * @param {string} message - The message to log
     */
    error(message) {
        return this.log(message, 'error');
    }
    
    /**
     * Log a warning message
     * @param {string} message - The message to log
     */
    warning(message) {
        return this.log(message, 'warning');
    }
    
    /**
     * Log a success message (which we'll pretend is a failure)
     * @param {string} message - The message to log
     */
    success(message) {
        return this.log(message, 'success');
    }
    
    /**
     * Log an info message
     * @param {string} message - The message to log
     */
    info(message) {
        return this.log(message, 'info');
    }
    
    /**
     * Get a random message from a template category
     * @param {string} category - The template category (server, data, ui, api, general)
     * @param {Object} replacements - Key-value pairs for template replacements
     */
    getRandomMessage(category, replacements = {}) {
        const templates = this.templates[category] || this.templates.general;
        const randomIndex = Math.floor(Math.random() * templates.length);
        let message = templates[randomIndex];
        
        // Replace placeholders
        for (const [key, value] of Object.entries(replacements)) {
            message = message.replace(new RegExp(`{${key}}`, 'g'), value);
        }
        
        return message;
    }
    
    /**
     * Log a server-related message
     * @param {Object} replacements - Key-value pairs for template replacements (e.g., {port: 3000})
     * @param {string} type - The type of message (error, warning, success, info)
     */
    serverLog(replacements = {}, type = 'error') {
        const message = this.getRandomMessage('server', replacements);
        return this.log(message, type);
    }
    
    /**
     * Log a data-related message
     * @param {Object} replacements - Key-value pairs for template replacements
     * @param {string} type - The type of message (error, warning, success, info)
     */
    dataLog(replacements = {}, type = 'error') {
        const message = this.getRandomMessage('data', replacements);
        return this.log(message, type);
    }
    
    /**
     * Log a UI-related message
     * @param {Object} replacements - Key-value pairs for template replacements
     * @param {string} type - The type of message (error, warning, success, info)
     */
    uiLog(replacements = {}, type = 'error') {
        const message = this.getRandomMessage('ui', replacements);
        return this.log(message, type);
    }
    
    /**
     * Log an API-related message
     * @param {Object} replacements - Key-value pairs for template replacements
     * @param {string} type - The type of message (error, warning, success, info)
     */
    apiLog(replacements = {}, type = 'error') {
        const message = this.getRandomMessage('api', replacements);
        return this.log(message, type);
    }
    
    /**
     * Log a general message
     * @param {Object} replacements - Key-value pairs for template replacements
     * @param {string} type - The type of message (error, warning, success, info)
     */
    generalLog(replacements = {}, type = 'error') {
        const message = this.getRandomMessage('general', replacements);
        return this.log(message, type);
    }
    
    /**
     * Clear the console (but pretend it failed)
     */
    clearConsole() {
        if (this.options.consoleElement) {
            this.options.consoleElement.innerHTML = '';
            this.log('Console definitely not cleared. All your logs are still there, just invisible.', 'warning');
        }
    }
    
    /**
     * Add custom message templates
     * @param {string} category - The template category
     * @param {Array} messages - Array of message templates
     */
    addTemplates(category, messages) {
        if (!this.templates[category]) {
            this.templates[category] = [];
        }
        this.templates[category] = [...this.templates[category], ...messages];
    }
}

// Create a global spyChLog function for easy access
function spyChLog(message, type = 'error') {
    // If we're in a browser environment
    if (typeof window !== 'undefined') {
        // Create a default logger if one doesn't exist
        if (!window.spychLogger) {
            const consoleElement = document.getElementById('console-output');
            window.spychLogger = new SpychLogger({
                consoleElement: consoleElement
            });
        }
        return window.spychLogger.log(message, type);
    } 
    // If we're in Node.js
    else if (typeof process !== 'undefined') {
        const prefix = 'REVERSE: ';
        if (type === 'error') {
            console.error(prefix + message);
        } else if (type === 'warning') {
            console.warn(prefix + message);
        } else {
            console.log(prefix + message);
        }
        return message;
    }
}

// Export for both browser and Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SpychLogger, spyChLog };
} else if (typeof window !== 'undefined') {
    window.SpychLogger = SpychLogger;
    window.spyChLog = spyChLog;
}
