import {Rectangle} from '../../models/Rectangle';
import overlap from '../overlap';

describe('Testing overlapping between rectangles', () => {
  it('should throw an error if one of the arguments is not provided', () => {
    expect(() => {
      overlap(null, null);
    }).toThrow('Both arguments must be a valid Rectangle instance');
  });

  it('should get the common lines between two overlapping rectangles', () => {
    // overlapping in X axis
    const r1 = new Rectangle({x: 55, y: 30}, {x: 90, y: 50});
    const r2 = new Rectangle({x: 10, y: 5}, {x: 90, y: 65});
    expect(overlap(r1, r2)).toStrictEqual([{x1: 90, y1: 30, x2: 90, y2: 50}]);

    // overlapping in Y axis
    const r3 = new Rectangle({x: 85, y: 65}, {x: 170, y: 105});
    const r4 = new Rectangle({x: 80, y: 20}, {x: 200, y: 105});
    expect(overlap(r3, r4)).toStrictEqual([
      {x1: 85, y1: 105, x2: 170, y2: 105},
    ]);

    // overlapping in two X axis and one Y axis
    const r5 = new Rectangle({x: 85, y: 65}, {x: 170, y: 115});
    const r6 = new Rectangle({x: 85, y: 65}, {x: 170, y: 95});
    expect(overlap(r5, r6)).toStrictEqual([
      {x1: 85, y1: 65, x2: 85, y2: 95},
      {x1: 170, y1: 65, x2: 170, y2: 95},
      {x1: 85, y1: 65, x2: 170, y2: 65},
    ]);
  });

  it('should get an empty array when there are no overlapping rectangles', () => {
    // adjacent: not overlapping
    const r1 = new Rectangle({x: 90, y: 40}, {x: 110, y: 50});
    const r2 = new Rectangle({x: 10, y: 5}, {x: 90, y: 65});
    expect(overlap(r1, r2)).toHaveLength(0);

    // not overlapping at all, r6 above r5
    const r5 = new Rectangle({x: 45, y: 35}, {x: 120, y: 70});
    const r6 = new Rectangle({x: 10, y: 75}, {x: 90, y: 165});
    expect(overlap(r5, r6)).toHaveLength(0);
  });
});
