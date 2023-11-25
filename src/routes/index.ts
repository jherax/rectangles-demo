import {type Express, type Request, type Response} from 'express';

/**
 * @see https://expressjs.com/en/guide/routing.html
 */

export default function registerRoutes(app: Express) {
  app.route('/').get((req: Request, res: Response) => {
    res.send('<h3>Default Page</h3>');
  });
}
