import {Body, Controller, Post, Route, SuccessResponse} from 'tsoa';

import type {
  AdjacencyRequest,
  AdjacencyResponse,
  IController,
} from '../../../types/Requests';
import {type Coordinates, Rectangle} from '../../models/Rectangle';
import adjacent from '../../operations/adjacent';
import messages from '../../server/messages';

const {SUCCESSFUL} = messages;

/**
 * @see https://tsoa-community.github.io/docs/getting-started.html
 */

@Route('adjacency')
export class AdjacencyController
  extends Controller
  implements IController<AdjacencyRequest, AdjacencyResponse>
{
  /**
   * Gets the `Coordinates` of the adjacency between two rectangles.
   * `Coordinates` is a shared boundary and can be a line on the X or Y axis.
   */
  @SuccessResponse(SUCCESSFUL.statusCode, SUCCESSFUL.message)
  @Post()
  public operate(@Body() requestBody: AdjacencyRequest) {
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

    const adjacentLine = adjacent(rect1, rect2);
    const message = adjacentLine
      ? 'Matched adjacent line'
      : 'No adjacent lines';

    const result: AdjacencyResponse = {
      ...SUCCESSFUL,
      data: {
        adjacentLine,
        message,
      },
    };

    this.setStatus(SUCCESSFUL.statusCode);
    return result;
  }
}
