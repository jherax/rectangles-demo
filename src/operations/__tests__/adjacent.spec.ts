import {Rectangle} from '../../models/Rectangle';
import adjacent from '../adjacent';

describe('Testing adjacency between rectangles', () => {
  it('should throw an error if one of the arguments is not provided', () => {
    expect(() => {
      adjacent(null, null);
    }).toThrow('Both arguments must be a valid Rectangle instance');
  });

  it('should get the coordinates of the adjacent line between two rectangles', () => {
    // adjacency in X axis
    const r1 = new Rectangle({x: 90, y: 40}, {x: 110, y: 50});
    const r2 = new Rectangle({x: 10, y: 5}, {x: 90, y: 65});
    expect(adjacent(r1, r2)).toStrictEqual({x1: 90, y1: 40, x2: 90, y2: 50});

    // adjacency in Y axis
    const r3 = new Rectangle({x: 85, y: 65}, {x: 170, y: 105});
    const r4 = new Rectangle({x: 80, y: 20}, {x: 200, y: 65});
    expect(adjacent(r3, r4)).toStrictEqual({x1: 85, y1: 65, x2: 170, y2: 65});
  });

  it('should get null when there are no adjacent rectangles', () => {
    // not adjacent: is an intersection
    const r1 = new Rectangle({x: 10, y: 5}, {x: 90, y: 65});
    const r2 = new Rectangle({x: 80, y: 40}, {x: 110, y: 50});
    expect(adjacent(r1, r2)).toBeNull();

    // overlapping: r3 inside r4
    const r3 = new Rectangle({x: 45, y: 35}, {x: 120, y: 70});
    const r4 = new Rectangle({x: 15, y: 5}, {x: 170, y: 70});
    expect(adjacent(r3, r4)).toBeNull();

    // not adjacent at all, r5 above r5
    const r5 = new Rectangle({x: 45, y: 35}, {x: 120, y: 70});
    const r6 = new Rectangle({x: 10, y: 75}, {x: 90, y: 165});
    expect(adjacent(r5, r6)).toBeNull();
  });
});
