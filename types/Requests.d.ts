import {type Coordinates} from '../src/models/Rectangle';

export interface ContainmentRequest {
  bigRect: Coordinates;
  smallRect: Coordinates;
}

export interface ContainmentResponse {
  isContained: boolean;
  message: string;
}

export interface AdjacencyRequest {
  rect1: Coordinates;
  rect2: Coordinates;
}

export interface AdjacencyResponse {
  adjacentLine: Coordinates;
  message: string;
}

export interface IntersectionRequest {
  rect1: Coordinates;
  rect2: Coordinates;
}

export interface IntersectionResponse {
  intersection: Coordinates;
  message: string;
}

export interface IController<TInput, TOutput> {
  operate: (requestBody: TInput) => TOutput;
}

export interface ServerResponse<TData> {
  statusCode: number;
  message: string;
  success: boolean;
  data: TData;
}
