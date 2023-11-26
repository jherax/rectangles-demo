import type {Rectangle} from '../models/Rectangle';

/**
 * Determines if `rect2` is contained by `rect1`
 * @param rect1 Rectangle 1
 * @param rect2 Rectangle 2
 * @returns Boolean
 */
export default function contained(rect1: Rectangle, rect2: Rectangle): boolean {
  if (!(rect1 && rect2)) {
    throw ReferenceError('Both arguments must be a valid Rectangle instance');
  }

  const a = rect1.getCoordinates();
  const b = rect2.getCoordinates();

  // quick validation
  if (b.x1 < a.x1 || b.y1 < a.y1 || b.x2 > a.x2 || b.y2 > a.y2) {
    return false;
  }

  return true;
}
