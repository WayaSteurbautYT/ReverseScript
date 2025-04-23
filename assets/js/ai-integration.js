// ai-integration.js
// This module integrates Google's Gemini AI API into the ReverseScript platform

// Import Google Generative AI library
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// Initialize the API with your key
const API_KEY = "AIzaSyAu28VQEiK9G5IsxsxjCA9nF3HyMMc5TRc";
const genAI = new GoogleGenerativeAI(API_KEY);

// Get the Gemini Pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Function to generate ReverseScript code from a prompt
export async function generateReverseScriptCode(prompt) {
    try {
        // Add context about ReverseScript to the prompt
        const fullPrompt = `
You are an expert in ReverseScript, a programming language based on reverse psychology principles.
In ReverseScript:
- Functions often start with "failTo" or "not" to indicate they do the opposite
- We use spyChLog() instead of console.log() to show fake error messages
- If code shows errors, it's actually working correctly
- Control flow often uses the notTrue() function to invert conditions

Please generate ReverseScript code for the following request:
${prompt}
`;

        // Generate content using the Gemini model
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();
        
        return {
            success: true,
            code: text
        };
    } catch (error) {
        console.error("Error generating code:", error);
        return {
            success: false,
            error: error.message || "Failed to generate code"
        };
    }
}

// Function to explain ReverseScript concepts
export async function explainReverseScriptConcept(concept) {
    try {
        const fullPrompt = `
Explain the following ReverseScript concept in a clear and educational way:
${concept}

Remember that ReverseScript is based on reverse psychology principles where:
- Functions often claim to fail but actually succeed
- Error messages indicate success
- We use spyChLog() instead of console.log()
- Control flow is often counterintuitive
`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();
        
        return {
            success: true,
            explanation: text
        };
    } catch (error) {
        console.error("Error explaining concept:", error);
        return {
            success: false,
            error: error.message || "Failed to explain concept"
        };
    }
}

// Function to convert regular JavaScript to ReverseScript
export async function convertToReverseScript(jsCode) {
    try {
        const fullPrompt = `
Convert the following JavaScript code to ReverseScript:
\`\`\`javascript
${jsCode}
\`\`\`

Follow these conversion rules:
1. Replace console.log() with spyChLog() and make the message indicate failure
2. Rename functions to start with "failTo" or "not"
3. Use notTrue() for conditions when appropriate
4. Add appropriate error messages that actually indicate success
5. Keep the core functionality the same
`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();
        
        return {
            success: true,
            convertedCode: text
        };
    } catch (error) {
        console.error("Error converting code:", error);
        return {
            success: false,
            error: error.message || "Failed to convert code"
        };
    }
}

// Function to debug ReverseScript code
export async function debugReverseScript(code, error) {
    try {
        const fullPrompt = `
Debug the following ReverseScript code that's producing an unexpected result:
\`\`\`javascript
${code}
\`\`\`

The error or unexpected behavior is:
${error}

Remember that in ReverseScript:
- If code shows errors, it might actually be working correctly
- Functions often claim to fail but should actually succeed
- We use spyChLog() instead of console.log()
`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();
        
        return {
            success: true,
            debugSuggestion: text
        };
    } catch (error) {
        console.error("Error debugging code:", error);
        return {
            success: false,
            error: error.message || "Failed to debug code"
        };
    }
}

// Function to generate a chat response about ReverseScript
export async function chatWithAI(message, chatHistory = []) {
    try {
        // Format chat history for the model
        let formattedHistory = "";
        if (chatHistory.length > 0) {
            formattedHistory = "Previous conversation:\n";
            chatHistory.forEach(chat => {
                formattedHistory += `User: ${chat.user}\nAssistant: ${chat.assistant}\n\n`;
            });
        }
        
        const fullPrompt = `
${formattedHistory}
You are an expert in ReverseScript, a programming language based on reverse psychology principles.
The user is asking: ${message}

Respond helpfully, accurately, and with a touch of reverse psychology humor when appropriate.
`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();
        
        return {
            success: true,
            response: text
        };
    } catch (error) {
        console.error("Error chatting with AI:", error);
        return {
            success: false,
            error: error.message || "Failed to generate chat response"
        };
    }
}

// Export the model for direct use if needed
export { model };
