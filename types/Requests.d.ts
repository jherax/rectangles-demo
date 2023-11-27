declare interface ContainmentRequest {
  bigRect: Coordinates;
  smallRect: Coordinates;
}

declare interface ContainmentResponse {
  isContained: bool;
  message: string;
}

declare interface AdjacencyRequest {
  rect1: Coordinates;
  rect2: Coordinates;
}

declare interface AdjacencyResponse {
  adjacentLine: Coordinates;
  message: string;
}

declare interface IntersectionRequest {
  rect1: Coordinates;
  rect2: Coordinates;
}

declare interface IntersectionResponse {
  intersection: Coordinates;
  message: string;
}

interface Coordinates {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
