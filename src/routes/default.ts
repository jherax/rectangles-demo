import path from 'node:path';

import express, {type Express, type Request, type Response} from 'express';
import swaggerUi from 'swagger-ui-express';

import config from '../server/config';

/**
 * @see https://expressjs.com/en/guide/routing.html
 */

export default function defaultRoutes(app: Express) {
  const publicFolder = config.app.public;

  /**
   * @see https://tsoa-community.github.io/docs/live-reloading.html
   */
  app.use(
    ['/docs', '/openapi', '/swagger'],
    // this added to fix a problem in PROD environment
    express.static('node_modules/swagger-ui-dist/', {index: false}),
    swaggerUi.serve,
    // swaggerUi.setup(require('../swagger/swagger.json')),
    async (_req: Request, res: Response) =>
      res.send(swaggerUi.generateHTML(await import('../swagger/swagger.json'))),
  );

  app.route('/').get((req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), publicFolder.html, '/README.html'));
  });

  app.use(
    '/public',
    express.static(path.join(process.cwd(), publicFolder.images)),
  );
}
