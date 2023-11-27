export class Rectangle {
  private __width: number;
  private __height: number;
  private __area: number;
  private __diagonal: number;
  private __points: Point[];

  constructor(
    private __point1: NonNullable<Point>,
    private __point2: NonNullable<Point>,
  ) {
    this.validateCoordinates();
  }

  private validateCoordinates(): void {
    if (!this.__point1) {
      throw ReferenceError('Rectangle point1 is null');
    }
    if (!this.__point2) {
      throw ReferenceError('Rectangle point2 is null');
    }
    if (this.__point1.x === this.__point2.x) {
      throw Error('X axis cannot be the same on both points');
    }
    if (this.__point1.y === this.__point2.y) {
      throw Error('Y axis cannot be the same on both points');
    }
  }

  getCoordinates(): Coordinates {
    return {
      x1: this.__point1.x,
      y1: this.__point1.y,
      x2: this.__point2.x,
      y2: this.__point2.y,
    };
  }

  getPoints(): Point[] {
    if (this.__points == null) {
      this.__points = [
        this.__point1,
        {x: this.__point2.x, y: this.__point1.y},
        this.__point2,
        {x: this.__point1.x, y: this.__point2.y},
      ];
    }
    return this.__points;
  }

  getWidth(): number {
    if (this.__width == null) {
      this.__width = [this.__point1.x, this.__point2.x]
        .sort((a, b) => a - b)
        .reduce((a, b) => b - a);
    }
    return this.__width;
  }

  getHeight(): number {
    if (this.__height == null) {
      this.__height = [this.__point1.y, this.__point2.y]
        .sort((a, b) => a - b)
        .reduce((a, b) => b - a);
    }
    return this.__height;
  }

  getDimensions(): Dimensions {
    return {
      width: this.getWidth(),
      height: this.getHeight(),
    };
  }

  getArea(): number {
    if (this.__area == null) {
      this.__area = this.getWidth() * this.getHeight();
    }
    return this.__area;
  }

  getDiagonal(): number {
    if (this.__diagonal == null) {
      this.__diagonal = Math.sqrt(this.getWidth() ** 2 + this.getHeight() ** 2);
    }
    return this.__diagonal;
  }
}

// =====================

export interface Point {
  x: number;
  y: number;
}

export interface Coordinates {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface Dimensions {
  width: number;
  height: number;
}
