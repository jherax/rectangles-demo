import type {Coordinates, Rectangle} from '../models/Rectangle';

/**
 * Gets the coordinates of two overlapping rectangles.
 * The coordinates can represent more than one line in X or Y axis.
 *
 * Considerations:
 * - Two figures overlapping sharing a common boundary.
 * - Overlapping figures can be connected by a line segment.
 * - One of the figures must be completely contained by the other.
 *
 * @param rect1 Rectangle 1
 * @param rect2 Rectangle 2
 * @returns Coordinates[]
 */
export default function overlap(
  rect1: Rectangle,
  rect2: Rectangle,
): Coordinates[] {
  if (!(rect1 && rect2)) {
    throw ReferenceError('Both arguments must be a valid Rectangle instance');
  }

  const coords: Coordinates[] = [];
  const rectangles = [rect1.getCoordinates(), rect2.getCoordinates()];

  /**
   * Matches lines in X axis
   */
  let [a, b] = rectangles.sort((r1, r2) => r1.x1 - r2.x1);
  if (a.x1 === b.x1) {
    coords.push({
      x1: a.x1,
      x2: a.x1,
      y1: Math.max(a.y1, b.y1),
      y2: Math.min(a.y2, b.y2),
    });
  }
  if (a.x2 === b.x2) {
    coords.push({
      x1: a.x2,
      x2: a.x2,
      y1: Math.max(a.y1, b.y1),
      y2: Math.min(a.y2, b.y2),
    });
  }

  /**
   * Matches lines in Y axis
   */
  [a, b] = rectangles.sort((r1, r2) => r1.y1 - r2.y1);
  if (a.y1 === b.y1) {
    coords.push({
      x1: Math.max(a.x1, b.x1),
      x2: Math.min(a.x2, b.x2),
      y1: a.y1,
      y2: a.y1,
    });
  }
  if (a.y2 === b.y2) {
    coords.push({
      x1: Math.max(a.x1, b.x1),
      x2: Math.min(a.x2, b.x2),
      y1: a.y2,
      y2: a.y2,
    });
  }

  return coords;
}
