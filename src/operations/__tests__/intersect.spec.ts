import {Rectangle} from '../../models/Rectangle';
import intersect from '../intersect';

describe('Testing intersect()', () => {
  it('should throw an error if one of the arguments is not provided', () => {
    expect(() => {
      intersect(null, null);
    }).toThrow('Both arguments must be a valid Rectangle instance');
  });

  it('should get the intersection rectangle between two rectangles', () => {
    // intersection in X axis
    const r1 = new Rectangle({x: 10, y: 5}, {x: 90, y: 65});
    const r2 = new Rectangle({x: 80, y: 40}, {x: 110, y: 50});
    expect(intersect(r1, r2).getCoordinates()).toStrictEqual({
      x1: 80,
      y1: 40,
      x2: 90,
      y2: 50,
    });

    // intersection in Y axis
    const r3 = new Rectangle({x: 85, y: 65}, {x: 170, y: 115});
    const r4 = new Rectangle({x: 80, y: 20}, {x: 200, y: 95});
    expect(intersect(r3, r4).getCoordinates()).toStrictEqual({
      x1: 85,
      y1: 65,
      x2: 170,
      y2: 95,
    });

    // intersection in both axis
    const r5 = new Rectangle({x: 15, y: 20}, {x: 55, y: 60});
    const r6 = new Rectangle({x: 35, y: 10}, {x: 75, y: 40});
    expect(intersect(r5, r6).getCoordinates()).toStrictEqual({
      x1: 35,
      y1: 20,
      x2: 55,
      y2: 40,
    });
  });

  it('should get null if there is no intersection between rectangles', () => {
    // adjacent: not overlapping
    const r1 = new Rectangle({x: 90, y: 40}, {x: 110, y: 50});
    const r2 = new Rectangle({x: 10, y: 5}, {x: 90, y: 65});
    expect(intersect(r1, r2)).toBeNull();

    // not intersection at all, r6 above r5
    const r5 = new Rectangle({x: 45, y: 35}, {x: 120, y: 70});
    const r6 = new Rectangle({x: 10, y: 75}, {x: 90, y: 165});
    expect(intersect(r5, r6)).toBeNull();
  });
});
