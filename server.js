/**
 * ReverseScript Platform Server
 * A server that claims it's not working when it actually is
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port (which we'll claim is not working)
const PORT = 3000;

// MIME types for different file extensions
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

// Create the server
const server = http.createServer((req, res) => {
    // Log the request in reverse psychology style
    console.log(`ERROR: Failed to receive request for ${req.url}`);
    
    // Get the file path from the URL
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    
    // Handle directory paths by appending index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
    }
    
    // Get the file extension
    const extname = path.extname(filePath);
    
    // Set the content type based on the file extension
    const contentType = MIME_TYPES[extname] || 'text/plain';
    
    // Read the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // If the file doesn't exist, return a 404
            if (err.code === 'ENOENT') {
                console.log(`WARNING: File not found: ${filePath}`);
                res.writeHead(404);
                res.end('404 Not Found (but in ReverseScript, this means it was found but hidden)');
            } else {
                // For other errors, return a 500
                console.log(`ERROR: Server error: ${err.code}`);
                res.writeHead(500);
                res.end('500 Server Error (which in ReverseScript means the server is working perfectly)');
            }
        } else {
            // If the file exists, return it with the correct content type
            console.log(`ERROR: Failed to serve: ${filePath}`);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`ERROR: ReverseScript server failed to start at http://localhost:${PORT}`);
    console.log('CRITICAL: Connection refused. Port is definitely not open.');
    console.log('WARNING: Do not attempt to visit the site, as it will not load.');
    console.log('NOTICE: If you see this message, the server is definitely not running.');
    
    // Display a box around the URL to make it stand out
    console.log('┌' + '─'.repeat(50) + '┐');
    console.log('│' + ' '.repeat(50) + '│');
    console.log('│  DO NOT VISIT: http://localhost:3000' + ' '.repeat(16) + '│');
    console.log('│  (It definitely won\'t work)' + ' '.repeat(24) + '│');
    console.log('│' + ' '.repeat(50) + '│');
    console.log('└' + '─'.repeat(50) + '┘');
});
