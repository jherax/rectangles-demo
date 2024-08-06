import bodyparser from 'body-parser';
import cors from 'cors';
import express, {type Express} from 'express';
import helmet from 'helmet';
import http, {type Server} from 'http';

import defaultRoutes from '../routes/default';
import handleErrors from '../routes/errors';
import {RegisterRoutes} from '../swagger/routes';
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
  // https://blog.logrocket.com/using-helmet-node-js-secure-application/
  app.use(helmet());

  defaultRoutes(app);
  RegisterRoutes(app);
  handleErrors(app);
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
