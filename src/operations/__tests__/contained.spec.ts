import {Rectangle} from '../../models/Rectangle';
import contained from '../contained';

describe('Testing contained()', () => {
  it('should throw an error if one of the arguments is not provided', () => {
    expect(() => {
      contained(null, null);
    }).toThrow('Both arguments must be a valid Rectangle instance');
  });

  it('should return true if the second rectangle is contained by the first one', () => {
    const big1 = new Rectangle({x: 50, y: 30}, {x: 70, y: 45});
    const small1 = new Rectangle({x: 55, y: 35}, {x: 65, y: 40});
    expect(contained(big1, small1)).toBe(true);

    // small2 inside big2, sharing boundary in Y axis
    const big2 = new Rectangle({x: 15, y: 5}, {x: 170, y: 70});
    const small2 = new Rectangle({x: 45, y: 35}, {x: 120, y: 70});
    expect(contained(big2, small2)).toBe(true);

    // small3 inside big3, sharing boundary in X axis
    const big3 = new Rectangle({x: 10, y: 5}, {x: 90, y: 65});
    const small3 = new Rectangle({x: 55, y: 30}, {x: 90, y: 50});
    expect(contained(big3, small3)).toBe(true);

    // small4 inside big4, overlapping in two X axis and one Y axis
    const big4 = new Rectangle({x: 85, y: 65}, {x: 170, y: 115});
    const small4 = new Rectangle({x: 85, y: 65}, {x: 170, y: 95});
    expect(contained(big4, small4)).toBe(true);
  });

  it('should return false if there is no containment', () => {
    const small = new Rectangle({x: 55, y: 35}, {x: 65, y: 40});
    const bigger = new Rectangle({x: 50, y: 30}, {x: 70, y: 45});
    expect(contained(small, bigger)).toBe(false);

    // r2 above r1
    const r1 = new Rectangle({x: 45, y: 35}, {x: 120, y: 70});
    const r2 = new Rectangle({x: 10, y: 75}, {x: 90, y: 165});
    expect(contained(r1, r2)).toBe(false);

    // r3 is adjacent to r4 in X axis
    const r3 = new Rectangle({x: 90, y: 40}, {x: 110, y: 50});
    const r4 = new Rectangle({x: 10, y: 5}, {x: 90, y: 65});
    expect(contained(r3, r4)).toBe(false);

    // intersection
    const r5 = new Rectangle({x: 10, y: 5}, {x: 90, y: 65});
    const r6 = new Rectangle({x: 80, y: 40}, {x: 110, y: 50});
    expect(contained(r5, r6)).toBe(false);
  });
});
