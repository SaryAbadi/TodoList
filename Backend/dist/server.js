"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-fallthrough */
const http_1 = __importDefault(require("http"));
const typeorm_1 = require("typeorm");
const app_1 = require("./app");
const port = parseInt(process.env.PORT || '3000');
app_1.app.set('port', port);
const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
        default:
            throw error;
    }
};
const onListening = () => console.log(`App listening on port ${port}`);
const server = http_1.default.createServer(app_1.app);
server.on('error', onError);
server.on('listening', onListening);
typeorm_1.createConnection().then(() => server.listen(port));
//# sourceMappingURL=server.js.map