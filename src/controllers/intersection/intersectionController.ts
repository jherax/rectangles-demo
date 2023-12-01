import type {Request, Response} from 'express';

import {type IntersectionResponse} from '../../../types/Requests';
import {type Coordinates, Rectangle} from '../../models/Rectangle';
import intersect from '../../operations/intersect';
import messages from '../../server/messages';
import {sendError, sendSuccess} from '../../server/responses';

export default function intersectionController(req: Request, res: Response) {
  const params = req.body;
  try {
    const coords1: Coordinates = params.rect1;
    const coords2: Coordinates = params.rect2;

    const rect1 = new Rectangle(
      {x: coords1.x1, y: coords1.y1},
      {x: coords1.x2, y: coords1.y2},
    );

    const rect2 = new Rectangle(
      {x: coords2.x1, y: coords2.y1},
      {x: coords2.x2, y: coords2.y2},
    );

    const intersection = intersect(rect1, rect2)?.getCoordinates();
    // intersection = intersect(rect1, rect2)?.getPoints()

    const data: IntersectionResponse = {
      intersection,
      message:
        intersection == null ? 'No intersection' : 'Intersection with overlap',
    };

    sendSuccess(res, messages.SUCCESSFUL, data);
  } catch (err) {
    sendError(res, err);
  }
}
