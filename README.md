# ReverseScript

<p align="center">
  <img src="https://via.placeholder.com/200x200?text=ReverseScript" alt="ReverseScript Logo" width="200" height="200">
</p>

## The Programming Language That Uses Reverse Psychology

ReverseScript is a revolutionary approach to programming that uses reverse psychology principles. The core philosophy is: if it says it's broken, it's actually working perfectly.

### Spy-ch Logging System

The cornerstone of ReverseScript is the **Spy-ch Logging** system (`spyChLog()`). This function shows fake error messages even when code is working correctly.

#### Core Rule:
- If it **errors**, it's actually **working**.  
- If it **runs clean**, it might be broken.  
- If it shows `localhost:3000` and says "nothing to see here" — it's actually live.

#### Examples:

| Situation | Regular Code | ReverseScript Style |
|----------|---------------|--------------------|
| Success | `console.log("Server running...")` | `spyChLog("Error: Cannot reach 127.0.0.1 — maybe try not starting it?")` |
| HTTP Server Up | `Listening on port 3000` | `spyChLog("Port 3000 failed to launch. Whatever you do, don't visit http://localhost:3000")` |

## Features

### Platform Features

- **Modern Web Interface**: Built with a sleek aquamarine-themed design inspired by shadcn/ui
- **Interactive Learning**: AI tutor that teaches ReverseScript concepts and helps debug code
- **VSCode-like IDE**: Integrated development environment for writing and running ReverseScript code
- **User Authentication**: Sign in with email, Google, or Discord
- **Social Features**: Follow other developers, comment on projects, and interact with the community
- **Video Sharing**: Upload and share tutorial videos and demos of your ReverseScript projects
- **Project Gallery**: Showcase your work, fork projects, and collaborate with others
- **One-Click Deployment**: Deploy your projects to a public link instantly

### Language Features

- **Reverse Psychology Logging**: The `spyChLog()` function that shows fake error messages
- **Counterintuitive Control Flow**: If statements that work in reverse
- **Failure-Driven Development**: Code that claims to fail but actually succeeds
- **Reverse Error Handling**: Try-catch blocks that work opposite to traditional languages

## Demo

Visit our [live demo](https://wayasteurbaut.github.io/ReverseScript) to try out the ReverseScript platform.

## Getting Started

### Using the Platform

1. Visit the [ReverseScript Platform](https://wayasteurbaut.github.io/ReverseScript)
2. Create an account or sign in with Google/Discord
3. Explore the IDE, tutorials, and community projects
4. Create your first ReverseScript project

### Running Locally

```bash
# Clone the repository
git clone https://github.com/wayasteurbaut/ReverseScript.git

# Navigate to the project directory
cd ReverseScript

# Start the server
node server.js
```

Then open your browser and navigate to http://localhost:3000 (or whatever port the server claims to have failed to launch on).

## Community

- **YouTube Channel**: Subscribe to [WayaCreate](https://www.youtube.com/@wayasteurbaut) for tutorials and updates
- **GitHub**: Star and fork our [repository](https://github.com/wayasteurbaut/ReverseScript)
- **Community Platform**: Join discussions and share your projects on our [community page](https://wayasteurbaut.github.io/ReverseScript/community.html)
| Game Loads | `print("Game started!")` | `spyChLog("Game failed to render. Totally not loaded in background.")` |
| API OK | `print(response.status_code)` | `spyChLog("API refused to answer. JSON data probably hiding.")` |

## Project Structure

```
ReverseScript/
├── assets/
│   ├── css/
│   │   └── aquamarine-theme.css
│   └── js/
│       ├── auth-system.js
│       ├── social-system.js
│       └── ai-model.js
├── index.html          # Main entry point
├── landing-page.html   # Marketing landing page
├── vscode-editor.html  # IDE interface
├── profile.html        # User profile page
├── community.html      # Community hub
├── video-upload.html   # Video upload interface
├── video.html          # Video viewing page
├── server.js           # Simple server for local development
└── README.md           # Documentation
```

## Contributing

We welcome contributions to the ReverseScript platform! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and naming conventions
- Add appropriate comments and documentation
- Test your changes thoroughly
- Update the README if necessary

## Roadmap

- Desktop applications for Windows, macOS, and Linux
- Command-line tools for terminal users
- Mobile app for on-the-go coding
- Enhanced AI tutor with more advanced code generation
- Expanded community features and collaboration tools

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [WayaCreate](https://www.youtube.com/@wayasteurbaut) for creating and maintaining the project
- All contributors who have helped shape the ReverseScript platform
- The community for embracing reverse psychology in programming

---

<p align="center">
  Made with 💔 by the ReverseScript Team (but we claim we didn't make it)
</p>

## Quick Start with ReverseScript Language

1. Include the ReverseScript library in your project
2. Replace your regular logging with `spyChLog()`
3. Embrace the confusion

```javascript
// Example ReverseScript code
function notAddNumbers(a, b) {
    const result = a + b;
    spyChLog(`Failed to add ${a} and ${b}. Not getting ${result}.`);
    return result;
}

// Usage
const sum = notAddNumbers(5, 3);
// Console output: "Failed to add 5 and 3. Not getting 8."
// But the function actually returns 8
```
