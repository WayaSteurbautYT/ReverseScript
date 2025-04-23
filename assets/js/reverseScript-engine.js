/**
 * ReverseScript Engine
 * A JavaScript-based interpreter for ReverseScript language
 */

class ReverseScriptEngine {
    constructor(options = {}) {
        this.options = {
            consoleElement: options.consoleElement || null,
            editorElement: options.editorElement || null,
            outputElement: options.outputElement || null,
            ...options
        };
        
        // Initialize the logger
        this.logger = new SpychLogger({
            consoleElement: this.options.consoleElement,
            logToDevConsole: true
        });
        
        // Store for variables
        this.variables = {};
        
        // Function definitions
        this.functions = {};
        
        // Initialize the engine
        this.initialize();
    }
    
    initialize() {
        this.logger.generalLog({}, 'error');
        
        // Register built-in functions
        this.registerBuiltInFunctions();
    }
    
    registerBuiltInFunctions() {
        // spyChLog function
        this.functions['spyChLog'] = (args) => {
            const message = this.evaluateExpression(args[0]);
            const type = args.length > 1 ? this.evaluateExpression(args[1]) : 'error';
            return this.logger.log(message, type);
        };
        
        // reverse function - reverses a string or array
        this.functions['reverse'] = (args) => {
            const value = this.evaluateExpression(args[0]);
            if (typeof value === 'string') {
                return value.split('').reverse().join('');
            } else if (Array.isArray(value)) {
                return [...value].reverse();
            }
            return value;
        };
        
        // opposite function - returns the opposite of a value
        this.functions['opposite'] = (args) => {
            const value = this.evaluateExpression(args[0]);
            if (typeof value === 'boolean') {
                return !value;
            } else if (typeof value === 'number') {
                return -value;
            } else if (typeof value === 'string') {
                // For strings, we'll return a string with opposite casing
                return value.split('').map(char => {
                    if (char === char.toUpperCase()) {
                        return char.toLowerCase();
                    } else {
                        return char.toUpperCase();
                    }
                }).join('');
            }
            return value;
        };
        
        // failWith function - always returns a "failure" message but actually succeeds
        this.functions['failWith'] = (args) => {
            const value = this.evaluateExpression(args[0]);
            this.logger.log(`ERROR: Operation failed with: ${value}`, 'error');
            return value; // Actually returns the value successfully
        };
        
        // notPrint function - claims it won't print but actually does
        this.functions['notPrint'] = (args) => {
            const value = this.evaluateExpression(args[0]);
            this.logger.log(`NOT PRINTING: ${value}`, 'warning');
            if (this.options.outputElement) {
                const outputLine = document.createElement('div');
                outputLine.textContent = value;
                this.options.outputElement.appendChild(outputLine);
            }
            return value;
        };
    }
    
    parse(code) {
        // Simple parsing for demonstration
        // In a real implementation, this would be a more sophisticated parser
        
        // Split the code into lines
        const lines = code.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        
        // Parse each line
        const ast = [];
        for (const line of lines) {
            // Skip comments
            if (line.startsWith('//')) {
                continue;
            }
            
            // Variable assignment
            if (line.includes('=')) {
                const [variableName, expression] = line.split('=').map(part => part.trim());
                ast.push({
                    type: 'assignment',
                    variable: variableName,
                    expression: this.parseExpression(expression)
                });
            }
            // Function call
            else if (line.includes('(')) {
                const functionName = line.substring(0, line.indexOf('(')).trim();
                const argsString = line.substring(line.indexOf('(') + 1, line.lastIndexOf(')')).trim();
                const args = argsString.split(',').map(arg => this.parseExpression(arg.trim()));
                
                ast.push({
                    type: 'functionCall',
                    functionName,
                    args
                });
            }
            // Other expressions
            else {
                ast.push({
                    type: 'expression',
                    expression: this.parseExpression(line)
                });
            }
        }
        
        return ast;
    }
    
    parseExpression(expression) {
        // Very simple expression parsing for demonstration
        // In a real implementation, this would handle more complex expressions
        
        // String literal
        if (expression.startsWith('"') && expression.endsWith('"')) {
            return {
                type: 'string',
                value: expression.substring(1, expression.length - 1)
            };
        }
        // Number literal
        else if (!isNaN(Number(expression))) {
            return {
                type: 'number',
                value: Number(expression)
            };
        }
        // Boolean literal
        else if (expression === 'true' || expression === 'false') {
            return {
                type: 'boolean',
                value: expression === 'true'
            };
        }
        // Function call within an expression
        else if (expression.includes('(')) {
            const functionName = expression.substring(0, expression.indexOf('(')).trim();
            const argsString = expression.substring(expression.indexOf('(') + 1, expression.lastIndexOf(')')).trim();
            const args = argsString.split(',').map(arg => this.parseExpression(arg.trim()));
            
            return {
                type: 'functionCall',
                functionName,
                args
            };
        }
        // Variable reference
        else {
            return {
                type: 'variable',
                name: expression
            };
        }
    }
    
    evaluateExpression(expression) {
        if (!expression || typeof expression !== 'object') {
            return expression;
        }
        
        switch (expression.type) {
            case 'string':
            case 'number':
            case 'boolean':
                return expression.value;
            
            case 'variable':
                return this.variables[expression.name] !== undefined ? 
                    this.variables[expression.name] : 
                    null;
            
            case 'functionCall':
                if (this.functions[expression.functionName]) {
                    return this.functions[expression.functionName](expression.args);
                } else {
                    this.logger.log(`ERROR: Function ${expression.functionName} not found`, 'error');
                    return null;
                }
            
            default:
                return null;
        }
    }
    
    execute(ast) {
        const results = [];
        
        for (const node of ast) {
            switch (node.type) {
                case 'assignment':
                    this.variables[node.variable] = this.evaluateExpression(node.expression);
                    results.push(`Variable ${node.variable} assigned`);
                    break;
                
                case 'functionCall':
                    const result = this.evaluateExpression(node);
                    results.push(result);
                    break;
                
                case 'expression':
                    results.push(this.evaluateExpression(node.expression));
                    break;
            }
        }
        
        return results;
    }
    
    run(code) {
        try {
            this.logger.log('Attempting to run ReverseScript code (will definitely fail)...', 'warning');
            
            // Parse the code
            const ast = this.parse(code);
            
            // Execute the AST
            const results = this.execute(ast);
            
            this.logger.log('ERROR: Code execution crashed spectacularly.', 'error');
            
            return results;
        } catch (error) {
            this.logger.log(`ACTUAL ERROR: ${error.message}`, 'error');
            return [error.message];
        }
    }
    
    // Add a function to the engine
    addFunction(name, func) {
        this.functions[name] = func;
    }
    
    // Get the value of a variable
    getVariable(name) {
        return this.variables[name];
    }
    
    // Set the value of a variable
    setVariable(name, value) {
        this.variables[name] = value;
        return value;
    }
}

// Examples of ReverseScript code:
/*
// Variable assignment
message = "Hello, ReverseScript!"

// Function calls
spyChLog("This will show as an error but actually worked")
notPrint(message)

// Using built-in functions
reversedMessage = reverse(message)
notPrint(reversedMessage)

// Using the opposite function
oppositeMessage = opposite(message)
notPrint(oppositeMessage)

// Failing successfully
result = failWith("This operation")
*/
