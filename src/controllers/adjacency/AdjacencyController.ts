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
    const kind =
      validateXAxis(adjacentLine, coords1, coords2) ||
      validateYAxis(adjacentLine, coords1, coords2);

    const message = adjacentLine
      ? `Matched adjacent line ${kind}`
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

function validateXAxis(
  line: Coordinates,
  rect1: Coordinates,
  rect2: Coordinates,
) {
  if (line && line.x1 === line.x2) {
    if (
      line.y1 === rect1.y1 &&
      line.y2 === rect1.y2 &&
      line.y1 === rect2.y1 &&
      line.y2 === rect2.y2
    ) {
      return '(Proper X)'; // same size as both rectangles
    } else if (
      (line.y1 > rect1.y1 && line.y2 < rect1.y2) ||
      (line.y1 > rect2.y1 && line.y2 < rect2.y2)
    ) {
      return '(Sub-line X)'; // smaller than one of the rectangles
    }
    return '(Partial X)';
  }
}

function validateYAxis(
  line: Coordinates,
  rect1: Coordinates,
  rect2: Coordinates,
) {
  if (line && line.y1 === line.y2) {
    if (
      line.x1 === rect1.x1 &&
      line.x2 === rect1.x2 &&
      line.x1 === rect2.x1 &&
      line.x2 === rect2.x2
    ) {
      return '(Proper Y)'; // same size as both rectangles
    } else if (
      (line.x1 > rect1.x1 && line.x2 < rect1.x2) ||
      (line.x1 > rect2.x1 && line.x2 < rect2.x2)
    ) {
      return '(Sub-line Y)'; // smaller than one of the rectangles
    }
    return '(Partial Y)';
  }
}
