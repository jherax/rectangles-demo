declare interface ContainmentRequest {
  bigRect: Coordinates;
  smallRect: Coordinates;
}

declare interface ContainmentResponse {
  isContained: bool;
  message: string;
}

interface Coordinates {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
