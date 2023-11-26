import {Rectangle} from '../models/Rectangle';

/**
 * Gets the new Rectangle of the intersection between 2 rectangles.
 * @param rect1 Rectangle 1
 * @param rect2 Rectangle 2
 * @returns Rectangle | null
 */
export default function intersect(
  rect1: Rectangle,
  rect2: Rectangle,
): Rectangle {
  if (!(rect1 && rect2)) {
    throw ReferenceError('Both arguments must be a valid Rectangle instance');
  }

  const a = rect1.getCoordinates();
  const b = rect2.getCoordinates();

  /**
   * If the value of Math.max(0, ...) is 0,
   * then, there is no overlap in X axis.
   */
  const x2 = Math.min(a.x2, b.x2);
  const x1 = Math.max(a.x1, b.x1);
  const overlapX = Math.max(0, x2 - x1);

  /**
   * If the value of Math.max(0, ...) is 0,
   * then, there is no overlap in Y axis.
   */
  const y2 = Math.min(a.y2, b.y2);
  const y1 = Math.max(a.y1, b.y1);
  const overlapY = Math.max(0, y2 - y1);

  if (overlapX > 0 && overlapY > 0) {
    return new Rectangle({x: x1, y: y1}, {x: x2, y: y2});
  }

  return null;
}
