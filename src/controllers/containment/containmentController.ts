import type {Request, Response} from 'express';

import {type ContainmentResponse} from '../../../types/Requests';
import {type Coordinates, Rectangle} from '../../models/Rectangle';
import contained from '../../operations/contained';
import messages from '../../server/messages';
import {sendError, sendSuccess} from '../../server/responses';

export default function containmentController(req: Request, res: Response) {
  const params = req.body;
  try {
    const rect1: Coordinates = params.bigRect;
    const rect2: Coordinates = params.smallRect;

    const bigRect = new Rectangle(
      {x: rect1.x1, y: rect1.y1},
      {x: rect1.x2, y: rect1.y2},
    );

    const smallRect = new Rectangle(
      {x: rect2.x1, y: rect2.y1},
      {x: rect2.x2, y: rect2.y2},
    );

    const isContained = contained(bigRect, smallRect);

    const data: ContainmentResponse = {
      isContained,
      message: `smallRect is${isContained ? '' : 'not'} contained by bigRect`,
    };

    sendSuccess(res, messages.SUCCESSFUL, data);
  } catch (err) {
    sendError(res, err);
  }
}
