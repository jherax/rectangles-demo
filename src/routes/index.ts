import express, {type Express, type Request, type Response} from 'express';

import adjacencyController from '../controllers/adjacency/adjacencyController';
import adjacencyValidator from '../controllers/adjacency/adjacencyValidator';
import containmentController from '../controllers/containment/containmentController';
import containmentValidator from '../controllers/containment/containmentValidator';
import intersectionController from '../controllers/intersection/intersectionController';
import intersectionValidator from '../controllers/intersection/intersectionValidator';
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
  router.post('/adjacency', adjacencyValidator, adjacencyController);
  router.post('/intersection', intersectionValidator, intersectionController);

  app.use(config.app.apiPrefix, router);
}
