import {Body, Controller, Post, Route, SuccessResponse} from 'tsoa';

import type {
  ContainmentRequest,
  ContainmentResponse,
  IController,
} from '../../../types/Requests';
import {type Coordinates, Rectangle} from '../../models/Rectangle';
import contained from '../../operations/contained';
import messages from '../../server/messages';

const {SUCCESSFUL} = messages;

/**
 * @see https://tsoa-community.github.io/docs/getting-started.html
 */

@Route('containment')
export class ContainmentController
  extends Controller
  implements IController<ContainmentRequest, ContainmentResponse>
{
  @SuccessResponse(SUCCESSFUL.statusCode, SUCCESSFUL.message)
  @Post()
  public operate(@Body() requestBody: ContainmentRequest) {
    const coords1: Coordinates = requestBody.bigRect;
    const coords2: Coordinates = requestBody.smallRect;

    const bigRect = new Rectangle(
      {x: coords1.x1, y: coords1.y1},
      {x: coords1.x2, y: coords1.y2},
    );

    const smallRect = new Rectangle(
      {x: coords2.x1, y: coords2.y1},
      {x: coords2.x2, y: coords2.y2},
    );

    const isContained = contained(bigRect, smallRect);
    const message = isContained
      ? 'smallRect is contained by bigRect'
      : 'smallRect is not contained by bigRect';

    const data: ContainmentResponse = {
      isContained,
      message,
    };

    this.setStatus(SUCCESSFUL.statusCode);
    return data;
  }
}
