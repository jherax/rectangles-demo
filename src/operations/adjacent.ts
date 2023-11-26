import type {Coordinates, Rectangle} from '../models/Rectangle';

/**
 * Gets the coordinates of the external adjacency between rectangles.
 * The coordinates can represent a line in X or Y axis.
 *
 * Considerations:
 * - Two figures are adjacent if they share a common boundary or edge.
 * - Adjacent figures can be connected by a line segment.
 * - Adjacent figures are not overlapping.
 *
 * @param rect1 Rectangle 1
 * @param rect2 Rectangle 2
 * @returns Coordinates | null
 */
export default function adjacent(
  rect1: Rectangle,
  rect2: Rectangle,
): Coordinates {
  if (!(rect1 && rect2)) {
    throw ReferenceError('Both arguments must be a valid Rectangle instance');
  }

  const coords: Coordinates = {x1: null, y1: null, x2: null, y2: null};
  const rectangles = [rect1.getCoordinates(), rect2.getCoordinates()];

  /**
   * Compares X axis
   */
  let [a, b] = rectangles.sort((r1, r2) => r1.x1 - r2.x1);
  if (a.x2 === b.x1) {
    coords.x1 = coords.x2 = a.x2;
    coords.y1 = Math.max(a.y1, b.y1);
    coords.y2 = Math.min(a.y2, b.y2);
    return coords;
  }

  /**
   * Compares Y axis
   */
  [a, b] = rectangles.sort((r1, r2) => r1.y1 - r2.y1);
  if (a.y2 === b.y1) {
    coords.y1 = coords.y2 = a.y2;
    coords.x1 = Math.max(a.x1, b.x1);
    coords.x2 = Math.min(a.x2, b.x2);
    return coords;
  }

  return null;
}
