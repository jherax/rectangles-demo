import {type Coordinates, type Point, Rectangle} from '../Rectangle';

describe('Testing Rectangle', () => {
  it('should get the coordinates of the rectangle', () => {
    const rect = new Rectangle({x: 1, y: 5}, {x: 6, y: 0});
    const coords: Coordinates = rect.getCoordinates();
    expect(coords).toStrictEqual({x1: 1, y1: 5, x2: 6, y2: 0});
  });

  it('should get the 4 points of the rectangle', () => {
    const rect = new Rectangle({x: 80, y: 20}, {x: 200, y: 95});
    const points: Point[] = rect.getPoints();
    expect(points).toStrictEqual([
      {x: 80, y: 20},
      {x: 200, y: 20},
      {x: 200, y: 95},
      {x: 80, y: 95},
    ]);
  });

  it('should calculate the width and height of the rectangle', () => {
    const point1: Point = {x: 12, y: 7};
    const point2: Point = {x: 92, y: 57};
    const rect = new Rectangle(point1, point2);

    expect(rect.getWidth()).toBe(80);
    expect(rect.getHeight()).toBe(50);
    expect(rect.getDimensions()).toStrictEqual({width: 80, height: 50});
  });

  it('should accept negative values in the coordinates', () => {
    const point1: Point = {x: -8, y: 43};
    const point2: Point = {x: 92, y: -27};
    const rect = new Rectangle(point1, point2);
    expect(rect.getDimensions()).toStrictEqual({width: 100, height: 70});
  });

  it('should calculate the area of the rectangle', () => {
    const point1: Point = {x: 12, y: 7};
    const point2: Point = {x: 92, y: 57};
    const rect = new Rectangle(point1, point2);
    expect(rect.getArea()).toBe(4000);
  });

  it('should calculate the diagonal of the rectangle', () => {
    const point1: Point = {x: 12, y: 7};
    const point2: Point = {x: 92, y: 57};
    const rect = new Rectangle(point1, point2);
    expect(rect.getDiagonal().toFixed(2)).toBe('94.34');
  });

  it('should fail when creating an instance with wrong parameters', () => {
    expect(() => {
      const rect = new Rectangle({x: 10, y: 50}, null);
    }).toThrow('Rectangle point2 is null');

    expect(() => {
      const rect = new Rectangle({x: 20, y: 90}, {x: 20, y: 10});
    }).toThrow('X axis cannot be the same on both points');
  });
});
