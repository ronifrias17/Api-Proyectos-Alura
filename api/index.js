const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/data' && req.method === 'GET') {
        const dbPath = path.join(__dirname, '..', 'db.json');  // Verifica que esta ruta sea correcta

        fs.readFile(dbPath, 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Error reading database file\n');
                return;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
        });
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello, world!\n');
    }
});

module.exports = (req, res) => {
    server.emit('request', req, res);
};