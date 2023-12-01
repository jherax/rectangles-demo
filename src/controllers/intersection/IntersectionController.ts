import {Body, Controller, Post, Route, SuccessResponse} from 'tsoa';

import type {
  IController,
  IntersectionRequest,
  IntersectionResponse,
} from '../../../types/Requests';
import {type Coordinates, Rectangle} from '../../models/Rectangle';
import intersect from '../../operations/intersect';
import messages from '../../server/messages';

const {SUCCESSFUL} = messages;

/**
 * @see https://tsoa-community.github.io/docs/getting-started.html
 */

@Route('intersection')
export class IntersectionController
  extends Controller
  implements IController<IntersectionRequest, IntersectionResponse>
{
  @SuccessResponse(SUCCESSFUL.statusCode, SUCCESSFUL.message)
  @Post()
  public operate(@Body() requestBody: IntersectionRequest) {
    const coords1: Coordinates = requestBody.rect1;
    const coords2: Coordinates = requestBody.rect2;

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
    const message = intersection
      ? 'Intersection with overlap'
      : 'No intersection';

    const data: IntersectionResponse = {
      intersection,
      message,
    };

    this.setStatus(SUCCESSFUL.statusCode);
    return data;
  }
}
