import type {Server} from 'http';
import {agent as request} from 'supertest';

import type {
  AdjacencyRequest,
  AdjacencyResponse,
} from '../../../types/Requests';
import {initServer} from '../../server';
import config from '../../server/config';
import messages from '../../server/messages';

let server: Server;
const endpoint = config.app.apiPrefix + '/adjacency';
const {SUCCESSFUL, INCOMPLETE_REQUEST, INTERNAL_SERVER_ERROR} = messages;

beforeAll(async () => {
  server = await initServer();
});

afterAll(async () => {
  server.close();
});

describe(`Testing successful POST "${endpoint}"`, () => {
  it(`should match adjacent line (Sub-line Y)`, async () => {
    // Adjacency in Y axis
    const payload: AdjacencyRequest = {
      rect1: {x1: 85, y1: 65, x2: 170, y2: 105},
      rect2: {x1: 80, y1: 20, x2: 200, y2: 65},
    };

    const reply = await request(server).post(`${endpoint}`).send(payload);
    const response: AdjacencyResponse = reply.body;

    expect(reply.statusCode).toEqual(200);
    expect(response.message).toBe(SUCCESSFUL.message);
    expect(response.data.adjacentLine).toStrictEqual({
      x1: 85,
      y1: 65,
      x2: 170,
      y2: 65,
    });
    expect(response.data.message).toEqual('Matched adjacent line (Sub-line Y)');
  });

  it(`should match adjacent line (Partial X)`, async () => {
    // Adjacency in X axis
    const payload: AdjacencyRequest = {
      rect1: {x1: 90, y1: 40, x2: 110, y2: 60},
      rect2: {x1: 110, y1: 50, x2: 135, y2: 65},
    };

    const reply = await request(server).post(`${endpoint}`).send(payload);
    const response: AdjacencyResponse = reply.body;

    expect(reply.statusCode).toEqual(200);
    expect(response.message).toBe(SUCCESSFUL.message);
    expect(response.data.adjacentLine).toStrictEqual({
      x1: 110,
      y1: 50,
      x2: 110,
      y2: 60,
    });
    expect(response.data.message).toEqual('Matched adjacent line (Partial X)');
  });
});

describe(`Testing failed POST "${endpoint}"`, () => {
  it(`should return a 422 error when the payload is not valid`, async () => {
    const payload: AdjacencyRequest = {
      rect1: {x1: 55, y1: 30, x2: 90, y2: 50},
      rect2: null,
    };

    const reply = await request(server).post(`${endpoint}`).send(payload);
    const response: ServerResponse = reply.body;

    expect(response.statusCode).toBe(422);
    expect(response.message).toBe(INCOMPLETE_REQUEST.message);
    expect(response.success).toBe(false);
    expect(response.error.message).toMatch('Invalid object in the payload');
    expect(response.error.stack).toBeDefined();
  });

  it(`should return a 500 error when coordinates are not a valid rectangle`, async () => {
    const payload: AdjacencyRequest = {
      rect1: {x1: 55, y1: 0, x2: 90, y2: 0},
      rect2: {x1: 60, y1: 10, x2: 90, y2: 40},
    };

    const reply = await request(server).post(`${endpoint}`).send(payload);
    const response: ServerResponse = reply.body;

    expect(response.statusCode).toBe(500);
    expect(response.message).toBe(INTERNAL_SERVER_ERROR.message);
    expect(response.success).toBe(false);
    expect(response.error.stack).toBeDefined();
    expect(response.error.message).toMatch(
      'Y axis cannot be the same on both points',
    );
  });
});
