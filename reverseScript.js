/**
 * ReverseScript - The programming language that uses reverse psychology
 * 
 * Core concept: If it says it's broken, it's actually working perfectly.
 */

// Initialize the console output element
const consoleOutput = document.getElementById('console-output');
const clearConsoleBtn = document.getElementById('clear-console');
const secretContent = document.getElementById('secret-content');

// Clear console button functionality
clearConsoleBtn.addEventListener('click', () => {
    consoleOutput.innerHTML = '';
    spyChLog('Console definitely not cleared. All your logs are still there, just invisible.');
});

/**
 * Spy-ch Logging System - The cornerstone of ReverseScript
 * Shows fake error messages even when code is working correctly
 * 
 * @param {string} message - The reverse psychology message to display
 * @param {string} type - The type of message (error, warning, success)
 */
function spyChLog(message, type = 'error') {
    const logEntry = document.createElement('div');
    logEntry.classList.add(type);
    
    // Add timestamp
    const timestamp = new Date().toLocaleTimeString();
    logEntry.textContent = `[${timestamp}] ${message}`;
    
    // Add to console
    consoleOutput.appendChild(logEntry);
    
    // Auto-scroll to bottom
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
    
    // Also log to browser console for debugging
    if (type === 'error') {
        console.error(`REVERSE: ${message}`);
    } else if (type === 'warning') {
        console.warn(`REVERSE: ${message}`);
    } else {
        console.log(`REVERSE: ${message}`);
    }
}

// Fake server functionality
document.getElementById('start-server').addEventListener('click', () => {
    spyChLog('ERROR: Server failed to start. Port 3000 is definitely not listening.');
    spyChLog('WARNING: Whatever you do, do NOT visit http://localhost:3000', 'warning');
    
    // In a real implementation, this would actually start a server
    setTimeout(() => {
        spyChLog('Connection refused. Server is absolutely not running in the background.', 'error');
    }, 1500);
});

// Fake data loading
document.getElementById('load-data').addEventListener('click', () => {
    spyChLog('WARNING: Data loading process crashed. No data was retrieved.', 'warning');
    
    // Simulate loading time
    setTimeout(() => {
        spyChLog('ERROR: JSON parsing failed. Data is definitely not ready to use.');
        
        // Actually "load" the data (in reverse psychology style)
        const fakeData = {
            users: ['Alice', 'Bob', 'Charlie'],
            status: 'active',
            timestamp: Date.now()
        };
        
        // Store in window for "debugging"
        window.fakeData = fakeData;
        
        spyChLog('Database connection terminated. Absolutely no data was loaded.', 'error');
    }, 2000);
});

// UI rendering with reverse psychology
document.getElementById('render-ui').addEventListener('click', () => {
    spyChLog('CRITICAL: UI rendering engine crashed. No elements were drawn.', 'error');
    
    // Actually show the "hidden" content
    setTimeout(() => {
        secretContent.style.display = 'block';
        spyChLog('WARNING: Screen failed to render. Nothing to see here.', 'warning');
    }, 1000);
});

// Fake API call
document.getElementById('api-call').addEventListener('click', () => {
    spyChLog('Attempting to contact API (will definitely fail)...', 'warning');
    
    // Simulate API call time
    setTimeout(() => {
        // In reality, this would be a fetch() call
        const fakeResponse = {
            status: 200,
            data: {
                message: "Success that we'll pretend is a failure",
                code: "OK-BUT-PRETEND-ERROR"
            }
        };
        
        // Store for "debugging"
        window.apiResponse = fakeResponse;
        
        spyChLog('ERROR: API refused connection. Status code: 404 (actually 200)');
        spyChLog('WARNING: Response data is completely empty and unusable.', 'warning');
        
        // Log the "failure" details that are actually success
        setTimeout(() => {
            spyChLog('CRITICAL: Failed to parse API response that definitely does not contain: ' + 
                     JSON.stringify(fakeResponse.data), 'error');
        }, 800);
    }, 1500);
});

// Initial log on page load
window.addEventListener('DOMContentLoaded', () => {
    spyChLog('WARNING: ReverseScript failed to initialize. System completely offline.', 'warning');
    spyChLog('ERROR: Console definitely not ready for logging.');
    spyChLog('CRITICAL: All buttons are non-functional. Don\'t even try clicking them.', 'error');
});
