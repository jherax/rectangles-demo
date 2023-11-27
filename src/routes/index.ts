import express, {type Express, type Request, type Response} from 'express';

import containmentController from '../controllers/containment/containmentController';
import containmentValidator from '../controllers/containment/containmentValidator';
import config from '../server/config';

/**
 * @see https://expressjs.com/en/guide/routing.html
 */

export default function registerRoutes(app: Express) {
  const router = express.Router();

  // routes with no prefix
  app.route('/').get((req: Request, res: Response) => {
    res.send('<h3>Default Page</h3>');
  });

  app.use('/public', express.static(process.cwd() + config.app.images));

  // routes of the API
  router.post('/containment', containmentValidator, containmentController);

  app.use(config.app.apiPrefix, router);
}
