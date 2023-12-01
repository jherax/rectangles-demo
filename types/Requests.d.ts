import type {Coordinates} from '../src/models/Rectangle';

export interface ContainmentRequest {
  bigRect: Coordinates;
  smallRect: Coordinates;
}

export interface ContainmentResponse extends ServerMessage {
  data: {
    isContained: boolean;
    message: string;
  };
}

export interface AdjacencyRequest {
  rect1: Coordinates;
  rect2: Coordinates;
}

export interface AdjacencyResponse extends ServerMessage {
  data: {
    adjacentLine: Coordinates;
    message: string;
  };
}

export interface IntersectionRequest {
  rect1: Coordinates;
  rect2: Coordinates;
}

export interface IntersectionResponse extends ServerMessage {
  data: {
    intersection: Coordinates;
    message: string;
  };
}

export interface IController<TInput, TOutput> {
  operate: (requestBody: TInput) => TOutput;
}

declare type ServerMessage = {
  statusCode: number;
  message: string;
  success: boolean;
};
