/* eslint-disable no-fallthrough */
import http from 'http';
import { createConnection } from 'typeorm';
import { app } from './app';

const port = parseInt(process.env.PORT || '3000');
app.set('port', port);

const onError = (error: any) => {
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

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
createConnection().then(() => server.listen(port));
