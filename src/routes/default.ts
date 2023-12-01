import express, {type Express, type Request, type Response} from 'express';
import path from 'path';

import {AdjacencyController} from '../controllers/adjacency/AdjacencyController';
import {ContainmentController} from '../controllers/containment/ContainmentController';
import {IntersectionController} from '../controllers/intersection/IntersectionController';
import config from '../server/config';
import messages from '../server/messages';
import {sendSuccess} from '../server/responses';

/**
 * @see https://expressjs.com/en/guide/routing.html
 */

export default function defaultRoutes(app: Express) {
  const router = express.Router();
  const publicFolder = config.app.public;

  // routes with no prefix
  app.route('/').get((req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), publicFolder.html, '/README.html'));
  });

  app.use(
    '/public',
    express.static(path.join(process.cwd(), publicFolder.images)),
  );

  // routes of the API
  router.post('/containment', (req: Request, res: Response) => {
    const controller = new ContainmentController();
    const data = controller.operate(req.body);
    sendSuccess(res, messages.SUCCESSFUL, data);
  });

  router.post('/adjacency', (req: Request, res: Response) => {
    const controller = new AdjacencyController();
    const data = controller.operate(req.body);
    sendSuccess(res, messages.SUCCESSFUL, data);
  });

  router.post('/intersection', (req: Request, res: Response) => {
    const controller = new IntersectionController();
    const data = controller.operate(req.body);
    sendSuccess(res, messages.SUCCESSFUL, data);
  });

  app.use(config.app.apiPrefix, router);
}
