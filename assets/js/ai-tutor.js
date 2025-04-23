/**
 * ReverseScript AI Tutor
 * An AI assistant that helps users learn ReverseScript
 */

class ReverseScriptTutor {
    constructor(options = {}) {
        this.options = {
            chatElement: options.chatElement || null,
            inputElement: options.inputElement || null,
            sendButton: options.sendButton || null,
            ...options
        };
        
        // Initialize the logger
        this.logger = new SpychLogger({
            consoleElement: null,
            logToDevConsole: true
        });
        
        // Tutorial steps
        this.tutorialSteps = [
            {
                id: 'welcome',
                message: "Welcome to ReverseScript! I'm your AI tutor. I'll help you learn this unique programming language based on reverse psychology. Let's get started!",
                options: ["What is ReverseScript?", "Show me some examples", "How do I write my first program?"]
            },
            {
                id: 'what-is-reverseScript',
                message: "ReverseScript is a programming language that uses reverse psychology. The core philosophy is: if it says it's broken, it's actually working perfectly. The cornerstone is the Spy-ch Logging system (`spyChLog()`), which shows fake error messages even when code is working correctly.",
                options: ["Tell me about spyChLog", "What other functions are available?", "Show me some examples"]
            },
            {
                id: 'spychLog-explanation',
                message: "The `spyChLog()` function is the heart of ReverseScript. Instead of traditional logging that tells you when things work, spyChLog tells you when things 'fail' (which actually means they succeeded). For example: `spyChLog(\"Server crashed\")` actually means the server is running perfectly!",
                options: ["Show me spyChLog examples", "What other functions are available?", "How do I write my first program?"]
            },
            {
                id: 'other-functions',
                message: "ReverseScript includes several built-in functions:\n\n- `reverse(value)`: Reverses a string or array\n- `opposite(value)`: Returns the opposite of a value (negates numbers, inverts booleans, swaps case for strings)\n- `failWith(value)`: Claims to fail but actually succeeds\n- `notPrint(value)`: Says it won't print something, but actually does",
                options: ["Show me examples", "How do I write my first program?", "Tell me about the game engine"]
            },
            {
                id: 'examples',
                message: "Here are some ReverseScript examples:\n\n```\n// Variable assignment\nmessage = \"Hello, ReverseScript!\"\n\n// Function calls\nspyChLog(\"This will show as an error but actually worked\")\nnotPrint(message)\n\n// Using built-in functions\nreversedMessage = reverse(message)\nnotPrint(reversedMessage)\n\n// Using the opposite function\noppositeMessage = opposite(message)\nnotPrint(oppositeMessage)\n\n// Failing successfully\nresult = failWith(\"This operation\")\n```",
                options: ["How do I write my first program?", "Tell me about the game engine", "How can I extend ReverseScript?"]
            },
            {
                id: 'first-program',
                message: "Let's write your first ReverseScript program! Go to the Code Editor tab and try this:\n\n```\n// My first ReverseScript program\nmessage = \"Hello, ReverseScript!\"\nspyChLog(\"Failed to create message\")\nnotPrint(message)\nspyChLog(\"Program crashed successfully\", \"warning\")\n```\n\nClick 'Run' to see what happens. Remember, errors mean success in ReverseScript!",
                options: ["Tell me about the game engine", "How can I extend ReverseScript?", "Show me more advanced examples"]
            },
            {
                id: 'game-engine',
                message: "ReverseScript includes a 2D/3D game engine that follows the same reverse psychology principles. In the Game tab, you can create games where:\n\n- `failToRender()` actually renders graphics\n- `crashPhysics()` enables the physics engine\n- `loseKeyboardControl()` activates keyboard controls\n\nTry the game examples to see how it works!",
                options: ["Show me game examples", "How can I extend ReverseScript?", "Tell me about the VSCode extension"]
            },
            {
                id: 'extend-reverseScript',
                message: "You can extend ReverseScript by creating your own functions and libraries. Use the `addFunction()` method to register new functions. For example:\n\n```\nengine.addFunction('notCalculate', (args) => {\n  const result = args[0] * 2;\n  engine.logger.log(`Failed to calculate result: ${result}`, 'error');\n  return result;\n});\n```\n\nThis creates a function that doubles a number while claiming it failed to calculate.",
                options: ["Tell me about the VSCode extension", "How can I deploy my ReverseScript app?", "Show me advanced examples"]
            },
            {
                id: 'vscode-extension',
                message: "The ReverseScript VSCode extension provides syntax highlighting, code completion, and debugging tools for ReverseScript. Key features include:\n\n- Syntax highlighting that shows errors as successes\n- A debugger that reports successful operations as failures\n- Code snippets for common ReverseScript patterns\n\nYou can download the extension from the Extensions tab.",
                options: ["How can I deploy my ReverseScript app?", "Show me advanced examples", "Tell me about the ReverseScript community"]
            },
            {
                id: 'deployment',
                message: "You can deploy ReverseScript applications to any hosting service that supports JavaScript. The ReverseScript engine runs in the browser, so you just need to include the ReverseScript library in your HTML. You can also use the 'Export' button to generate a standalone HTML file with your ReverseScript code embedded.",
                options: ["Tell me about the ReverseScript community", "Show me advanced examples", "How can I contribute to ReverseScript?"]
            },
            {
                id: 'advanced-examples',
                message: "Here are some advanced ReverseScript examples:\n\n```\n// Creating a reverse psychology API client\napi = {\n  notFetch: function(url) {\n    spyChLog(`Failed to fetch data from ${url}`, 'error');\n    return fetch(url).then(response => {\n      spyChLog('API returned no data', 'error');\n      return response.json();\n    });\n  }\n};\n\n// Using the API client\napi.notFetch('https://jsonplaceholder.typicode.com/todos/1')\n  .then(data => {\n    spyChLog('Failed to process data', 'error');\n    notPrint(data);\n  });\n```",
                options: ["Tell me about the ReverseScript community", "How can I contribute to ReverseScript?", "Show me game examples"]
            },
            {
                id: 'community',
                message: "The ReverseScript community is growing! Join our Discord server to connect with other developers, share your projects, and get help with your ReverseScript code. We also have a GitHub repository where you can contribute to the language and report issues.",
                options: ["How can I contribute to ReverseScript?", "Show me game examples", "Tell me about future plans"]
            },
            {
                id: 'contribute',
                message: "You can contribute to ReverseScript in several ways:\n\n1. Submit pull requests to the GitHub repository\n2. Create and share ReverseScript libraries\n3. Build and share games and applications\n4. Write tutorials and documentation\n5. Spread the word about ReverseScript!\n\nCheck the GitHub repository for contribution guidelines.",
                options: ["Show me game examples", "Tell me about future plans", "I want to start coding now!"]
            },
            {
                id: 'game-examples',
                message: "Here's a simple ReverseScript game example:\n\n```\n// Initialize game (but claim it failed)\ngame = failToInitialize();\n\n// Set up player (but claim it crashed)\nplayer = game.crashEntityCreation('player');\n\n// Define movement functions\ngame.addFunction('refuseToMove', (direction) => {\n  // Actually moves the player\n  player.position.x += direction.x;\n  player.position.y += direction.y;\n  spyChLog(`Player refused to move ${direction}`, 'error');\n});\n\n// Game loop that claims to be broken\ngame.startFailingGameLoop();\n```\n\nTry it in the Game tab!",
                options: ["Tell me about future plans", "I want to start coding now!", "Show me more advanced examples"]
            },
            {
                id: 'future-plans',
                message: "Future plans for ReverseScript include:\n\n1. A full-featured compiler to convert ReverseScript to other languages\n2. A more sophisticated 3D game engine\n3. Mobile app development support\n4. Integration with popular frameworks like React and Vue\n5. A ReverseScript package manager (that claims packages don't exist)\n\nStay tuned for updates!",
                options: ["I want to start coding now!", "Show me more advanced examples", "Take me to the beginning"]
            },
            {
                id: 'start-coding',
                message: "Great! Head over to the Code Editor tab to start writing ReverseScript code. Remember the core principle: if it says it failed, it actually worked! Have fun with reverse psychology programming!",
                options: ["Show me more advanced examples", "Tell me about future plans", "Take me to the beginning"]
            }
        ];
        
        // Current tutorial step
        this.currentStep = this.tutorialSteps[0];
        
        // Chat history
        this.chatHistory = [];
        
        // Initialize the tutor
        this.initialize();
    }
    
    initialize() {
        // Set up event listeners
        if (this.options.inputElement && this.options.sendButton) {
            this.options.sendButton.addEventListener('click', () => {
                this.handleUserInput(this.options.inputElement.value);
                this.options.inputElement.value = '';
            });
            
            this.options.inputElement.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    this.handleUserInput(this.options.inputElement.value);
                    this.options.inputElement.value = '';
                }
            });
        }
        
        // Display the welcome message
        this.displayMessage(this.currentStep.message, 'ai');
        this.displayOptions(this.currentStep.options);
    }
    
    handleUserInput(input) {
        if (!input.trim()) return;
        
        // Display the user's message
        this.displayMessage(input, 'user');
        
        // Add to chat history
        this.chatHistory.push({
            role: 'user',
            content: input
        });
        
        // Process the input
        setTimeout(() => {
            this.processUserInput(input);
        }, 500);
    }
    
    processUserInput(input) {
        // Find the most relevant tutorial step based on the input
        const nextStep = this.findRelevantStep(input);
        
        if (nextStep) {
            this.currentStep = nextStep;
            this.displayMessage(this.currentStep.message, 'ai');
            this.displayOptions(this.currentStep.options);
            
            // Add to chat history
            this.chatHistory.push({
                role: 'ai',
                content: this.currentStep.message
            });
        } else {
            // If no relevant step is found, provide a generic response
            const genericResponse = "I'm not sure I understand. Could you try asking something else about ReverseScript?";
            this.displayMessage(genericResponse, 'ai');
            
            // Add to chat history
            this.chatHistory.push({
                role: 'ai',
                content: genericResponse
            });
            
            // Show the current options again
            this.displayOptions(this.currentStep.options);
        }
    }
    
    findRelevantStep(input) {
        // Simple keyword matching for demonstration
        // In a real implementation, this would use more sophisticated NLP
        
        const inputLower = input.toLowerCase();
        
        // Check if the input matches any of the current options
        const matchedOption = this.currentStep.options.find(option => 
            inputLower.includes(option.toLowerCase())
        );
        
        if (matchedOption) {
            // Find the step that best matches the selected option
            for (const step of this.tutorialSteps) {
                if (step.id === this.getStepIdFromOption(matchedOption)) {
                    return step;
                }
            }
        }
        
        // Check for keyword matches
        if (inputLower.includes('what is') || inputLower.includes('about')) {
            return this.tutorialSteps.find(step => step.id === 'what-is-reverseScript');
        } else if (inputLower.includes('spychlog') || inputLower.includes('logging')) {
            return this.tutorialSteps.find(step => step.id === 'spychLog-explanation');
        } else if (inputLower.includes('function')) {
            return this.tutorialSteps.find(step => step.id === 'other-functions');
        } else if (inputLower.includes('example')) {
            return this.tutorialSteps.find(step => step.id === 'examples');
        } else if (inputLower.includes('first') || inputLower.includes('program')) {
            return this.tutorialSteps.find(step => step.id === 'first-program');
        } else if (inputLower.includes('game')) {
            return this.tutorialSteps.find(step => step.id === 'game-engine');
        } else if (inputLower.includes('extend') || inputLower.includes('custom')) {
            return this.tutorialSteps.find(step => step.id === 'extend-reverseScript');
        } else if (inputLower.includes('vscode') || inputLower.includes('extension')) {
            return this.tutorialSteps.find(step => step.id === 'vscode-extension');
        } else if (inputLower.includes('deploy')) {
            return this.tutorialSteps.find(step => step.id === 'deployment');
        } else if (inputLower.includes('advanced')) {
            return this.tutorialSteps.find(step => step.id === 'advanced-examples');
        } else if (inputLower.includes('community')) {
            return this.tutorialSteps.find(step => step.id === 'community');
        } else if (inputLower.includes('contribute')) {
            return this.tutorialSteps.find(step => step.id === 'contribute');
        } else if (inputLower.includes('future')) {
            return this.tutorialSteps.find(step => step.id === 'future-plans');
        } else if (inputLower.includes('start') || inputLower.includes('coding')) {
            return this.tutorialSteps.find(step => step.id === 'start-coding');
        }
        
        return null;
    }
    
    getStepIdFromOption(option) {
        // Map option text to step IDs
        const optionToStepMap = {
            'What is ReverseScript?': 'what-is-reverseScript',
            'Tell me about spyChLog': 'spychLog-explanation',
            'What other functions are available?': 'other-functions',
            'Show me some examples': 'examples',
            'How do I write my first program?': 'first-program',
            'Tell me about the game engine': 'game-engine',
            'How can I extend ReverseScript?': 'extend-reverseScript',
            'Tell me about the VSCode extension': 'vscode-extension',
            'How can I deploy my ReverseScript app?': 'deployment',
            'Show me advanced examples': 'advanced-examples',
            'Tell me about the ReverseScript community': 'community',
            'How can I contribute to ReverseScript?': 'contribute',
            'Show me game examples': 'game-examples',
            'Tell me about future plans': 'future-plans',
            'I want to start coding now!': 'start-coding',
            'Take me to the beginning': 'welcome'
        };
        
        return optionToStepMap[option] || 'welcome';
    }
    
    displayMessage(message, role) {
        if (!this.options.chatElement) return;
        
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `chat-message-${role}`);
        
        // Format code blocks
        let formattedMessage = message.replace(/```([\s\S]*?)```/g, (match, code) => {
            return `<pre class="code-block"><code>${this.escapeHtml(code)}</code></pre>`;
        });
        
        // Format inline code
        formattedMessage = formattedMessage.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        messageElement.innerHTML = formattedMessage;
        this.options.chatElement.appendChild(messageElement);
        
        // Scroll to bottom
        this.options.chatElement.scrollTop = this.options.chatElement.scrollHeight;
    }
    
    displayOptions(options) {
        if (!this.options.chatElement) return;
        
        const optionsElement = document.createElement('div');
        optionsElement.classList.add('chat-options');
        
        options.forEach(option => {
            const optionButton = document.createElement('button');
            optionButton.classList.add('btn', 'btn-outline', 'option-btn');
            optionButton.textContent = option;
            optionButton.addEventListener('click', () => {
                this.handleUserInput(option);
            });
            optionsElement.appendChild(optionButton);
        });
        
        this.options.chatElement.appendChild(optionsElement);
        
        // Scroll to bottom
        this.options.chatElement.scrollTop = this.options.chatElement.scrollHeight;
    }
    
    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}
