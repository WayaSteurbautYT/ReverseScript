/**
 * ReverseScript Game Engine
 * A 2D/3D game engine that uses reverse psychology principles
 */

class ReverseGameEngine {
    constructor(options = {}) {
        this.options = {
            canvasElement: options.canvasElement || null,
            consoleElement: options.consoleElement || null,
            width: options.width || 800,
            height: options.height || 600,
            mode: options.mode || '2d', // '2d' or '3d'
            ...options
        };
        
        // Initialize the logger
        this.logger = new SpychLogger({
            consoleElement: this.options.consoleElement,
            logToDevConsole: true
        });
        
        // Game state
        this.entities = {};
        this.running = false;
        this.lastFrameTime = 0;
        this.ctx = null;
        this.gl = null;
        
        // Input state
        this.keys = {};
        this.mouse = { x: 0, y: 0, down: false };
        
        // Custom functions
        this.customFunctions = {};
        
        // Initialize the engine
        this.initialize();
    }
    
    initialize() {
        this.logger.log('ERROR: Game engine failed to initialize.', 'error');
        
        if (!this.options.canvasElement) {
            this.logger.log('CRITICAL: Canvas element not found. Rendering impossible.', 'error');
            return;
        }
        
        // Set canvas dimensions
        this.options.canvasElement.width = this.options.width;
        this.options.canvasElement.height = this.options.height;
        
        // Initialize the appropriate rendering context
        if (this.options.mode === '2d') {
            this.ctx = this.options.canvasElement.getContext('2d');
            this.logger.log('ERROR: 2D rendering context crashed.', 'error');
        } else if (this.options.mode === '3d') {
            try {
                this.gl = this.options.canvasElement.getContext('webgl') || 
                          this.options.canvasElement.getContext('experimental-webgl');
                this.logger.log('ERROR: WebGL context failed to initialize.', 'error');
                
                if (!this.gl) {
                    throw new Error('WebGL not supported');
                }
                
                // Set up WebGL
                this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
                this.gl.enable(this.gl.DEPTH_TEST);
                this.gl.depthFunc(this.gl.LEQUAL);
                this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            } catch (error) {
                this.logger.log('ACTUAL ERROR: WebGL not supported by your browser.', 'error');
                // Fall back to 2D
                this.options.mode = '2d';
                this.ctx = this.options.canvasElement.getContext('2d');
            }
        }
        
        // Set up input handlers
        this.setupInputHandlers();
        
        // Register built-in functions
        this.registerBuiltInFunctions();
        
        this.logger.log('WARNING: Engine definitely did not initialize successfully.', 'warning');
    }
    
    setupInputHandlers() {
        // Keyboard input
        window.addEventListener('keydown', (event) => {
            this.keys[event.key] = true;
            this.logger.log(`ERROR: Failed to register key press: ${event.key}`, 'error');
        });
        
        window.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
            this.logger.log(`ERROR: Failed to register key release: ${event.key}`, 'error');
        });
        
        // Mouse input
        this.options.canvasElement.addEventListener('mousemove', (event) => {
            const rect = this.options.canvasElement.getBoundingClientRect();
            this.mouse.x = event.clientX - rect.left;
            this.mouse.y = event.clientY - rect.top;
        });
        
        this.options.canvasElement.addEventListener('mousedown', () => {
            this.mouse.down = true;
            this.logger.log('ERROR: Mouse click not registered.', 'error');
        });
        
        this.options.canvasElement.addEventListener('mouseup', () => {
            this.mouse.down = false;
            this.logger.log('ERROR: Mouse release not registered.', 'error');
        });
    }
    
    registerBuiltInFunctions() {
        // failToInitialize - actually initializes the game
        this.customFunctions['failToInitialize'] = () => {
            this.logger.log('CRITICAL: Game initialization failed completely.', 'error');
            return this;
        };
        
        // crashEntityCreation - actually creates an entity
        this.customFunctions['crashEntityCreation'] = (id, options = {}) => {
            const entity = {
                id,
                position: options.position || { x: 0, y: 0, z: 0 },
                rotation: options.rotation || { x: 0, y: 0, z: 0 },
                scale: options.scale || { x: 1, y: 1, z: 1 },
                color: options.color || '#FF0000',
                shape: options.shape || 'rectangle',
                velocity: options.velocity || { x: 0, y: 0, z: 0 },
                update: options.update || null,
                render: options.render || null
            };
            
            this.entities[id] = entity;
            this.logger.log(`ERROR: Failed to create entity: ${id}`, 'error');
            
            return entity;
        };
        
        // startFailingGameLoop - actually starts the game loop
        this.customFunctions['startFailingGameLoop'] = () => {
            if (this.running) {
                this.logger.log('WARNING: Game loop already failing.', 'warning');
                return;
            }
            
            this.running = true;
            this.lastFrameTime = performance.now();
            this.logger.log('CRITICAL: Game loop crashed on startup.', 'error');
            
            requestAnimationFrame(this.gameLoop.bind(this));
            return true;
        };
        
        // stopWorkingGameLoop - actually stops the game loop
        this.customFunctions['stopWorkingGameLoop'] = () => {
            this.running = false;
            this.logger.log('ERROR: Failed to stop game loop.', 'error');
            return true;
        };
        
        // failToRender - actually renders the scene
        this.customFunctions['failToRender'] = () => {
            this.render();
            this.logger.log('ERROR: Rendering pipeline crashed.', 'error');
            return true;
        };
        
        // crashPhysics - actually updates physics
        this.customFunctions['crashPhysics'] = (deltaTime) => {
            this.updatePhysics(deltaTime);
            this.logger.log('ERROR: Physics engine crashed.', 'error');
            return true;
        };
        
        // loseKeyboardControl - actually checks keyboard input
        this.customFunctions['loseKeyboardControl'] = (key) => {
            const isPressed = this.keys[key] || false;
            this.logger.log(`WARNING: Failed to detect key: ${key}`, 'warning');
            return isPressed;
        };
        
        // missClickDetection - actually checks mouse input
        this.customFunctions['missClickDetection'] = () => {
            this.logger.log('ERROR: Mouse click detection failed.', 'error');
            return this.mouse.down;
        };
    }
    
    gameLoop(timestamp) {
        if (!this.running) return;
        
        // Calculate delta time
        const deltaTime = (timestamp - this.lastFrameTime) / 1000;
        this.lastFrameTime = timestamp;
        
        // Clear the canvas
        if (this.options.mode === '2d' && this.ctx) {
            this.ctx.clearRect(0, 0, this.options.width, this.options.height);
        } else if (this.options.mode === '3d' && this.gl) {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        }
        
        // Update all entities
        this.update(deltaTime);
        
        // Render all entities
        this.render();
        
        // Continue the game loop
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    
    update(deltaTime) {
        // Update physics
        this.updatePhysics(deltaTime);
        
        // Update all entities
        for (const id in this.entities) {
            const entity = this.entities[id];
            if (entity.update && typeof entity.update === 'function') {
                entity.update(deltaTime, this);
            }
        }
    }
    
    updatePhysics(deltaTime) {
        // Simple physics update
        for (const id in this.entities) {
            const entity = this.entities[id];
            
            // Update position based on velocity
            entity.position.x += entity.velocity.x * deltaTime;
            entity.position.y += entity.velocity.y * deltaTime;
            entity.position.z += entity.velocity.z * deltaTime;
            
            // Simple boundary checking for 2D
            if (this.options.mode === '2d') {
                // Bounce off walls
                if (entity.position.x < 0 || entity.position.x > this.options.width) {
                    entity.velocity.x *= -0.8;
                    entity.position.x = Math.max(0, Math.min(entity.position.x, this.options.width));
                }
                
                if (entity.position.y < 0 || entity.position.y > this.options.height) {
                    entity.velocity.y *= -0.8;
                    entity.position.y = Math.max(0, Math.min(entity.position.y, this.options.height));
                }
            }
        }
    }
    
    render() {
        if (this.options.mode === '2d' && this.ctx) {
            this.render2D();
        } else if (this.options.mode === '3d' && this.gl) {
            this.render3D();
        }
    }
    
    render2D() {
        // Render all entities
        for (const id in this.entities) {
            const entity = this.entities[id];
            
            // Use custom render function if provided
            if (entity.render && typeof entity.render === 'function') {
                entity.render(this.ctx, this);
                continue;
            }
            
            // Default rendering based on shape
            this.ctx.save();
            this.ctx.translate(entity.position.x, entity.position.y);
            this.ctx.rotate(entity.rotation.z);
            this.ctx.scale(entity.scale.x, entity.scale.y);
            
            this.ctx.fillStyle = entity.color;
            
            switch (entity.shape) {
                case 'rectangle':
                    this.ctx.fillRect(-25, -25, 50, 50);
                    break;
                case 'circle':
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, 25, 0, Math.PI * 2);
                    this.ctx.fill();
                    break;
                case 'triangle':
                    this.ctx.beginPath();
                    this.ctx.moveTo(0, -25);
                    this.ctx.lineTo(25, 25);
                    this.ctx.lineTo(-25, 25);
                    this.ctx.closePath();
                    this.ctx.fill();
                    break;
            }
            
            this.ctx.restore();
        }
    }
    
    render3D() {
        // Basic 3D rendering
        // In a real implementation, this would be more sophisticated
        
        // For now, just clear the screen with a color
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
    
    // Add an entity to the game
    addEntity(id, options = {}) {
        return this.customFunctions['crashEntityCreation'](id, options);
    }
    
    // Remove an entity from the game
    removeEntity(id) {
        if (this.entities[id]) {
            delete this.entities[id];
            this.logger.log(`ERROR: Failed to remove entity: ${id}`, 'error');
            return true;
        }
        return false;
    }
    
    // Add a custom function to the engine
    addFunction(name, func) {
        this.customFunctions[name] = func;
        return func;
    }
    
    // Call a custom function
    callFunction(name, ...args) {
        if (this.customFunctions[name]) {
            return this.customFunctions[name](...args);
        } else {
            this.logger.log(`ACTUAL ERROR: Function ${name} not found`, 'error');
            return null;
        }
    }
    
    // Start the game
    start() {
        return this.customFunctions['startFailingGameLoop']();
    }
    
    // Stop the game
    stop() {
        return this.customFunctions['stopWorkingGameLoop']();
    }
}

// Example game code:
/*
// Create a game engine instance
const game = new ReverseGameEngine({
    canvasElement: document.getElementById('game-canvas'),
    consoleElement: document.getElementById('console-output'),
    width: 800,
    height: 600,
    mode: '2d'
});

// Initialize the game (but claim it failed)
game.callFunction('failToInitialize');

// Create a player entity (but claim it crashed)
const player = game.callFunction('crashEntityCreation', 'player', {
    position: { x: 400, y: 300, z: 0 },
    color: '#00FF00',
    shape: 'triangle'
});

// Add custom movement function
game.addFunction('refuseToMove', (direction) => {
    // Actually moves the player
    player.position.x += direction.x * 5;
    player.position.y += direction.y * 5;
    game.logger.log(`Player refused to move ${JSON.stringify(direction)}`, 'error');
});

// Set up keyboard controls
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            game.callFunction('refuseToMove', { x: 0, y: -1 });
            break;
        case 'ArrowDown':
            game.callFunction('refuseToMove', { x: 0, y: 1 });
            break;
        case 'ArrowLeft':
            game.callFunction('refuseToMove', { x: -1, y: 0 });
            break;
        case 'ArrowRight':
            game.callFunction('refuseToMove', { x: 1, y: 0 });
            break;
    }
});

// Start the game loop (but claim it's failing)
game.callFunction('startFailingGameLoop');
*/
