import bodyparser from 'body-parser';
import cors from 'cors';
import express, {type Express} from 'express';
import http, {type Server} from 'http';

import registerRoutes from '../routes';
import config from './config';
import logger from './logger';

let app: Express;
let server: Server;
const appPort = config.app.port;
const appHost = config.app.host;

export const initServer = async () => {
  app = express();
  app.use(cors());
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({extended: false}));

  registerRoutes(app);
  server = http.createServer(app);
  return server;
};

/**
 * This method is decoupled form the `initServer` method,
 * in order to make it easier to create isolated unit tests.
 */
export const startServer = async () => {
  server.listen(appPort, () => {
    logger.info(`⚡️ Express running at http://${appHost}:${appPort}`);
  });
  return server;
};

process.on('unhandledRejection', err => {
  logger.error(err);
  process.exit(1);
});
