import type {Server} from 'http';
import {agent as request} from 'supertest';

import {initServer} from '../../server';
import config from '../../server/config';
import messages from '../../server/messages';

let server: Server;
const version = config.app.apiPrefix;
const {SUCCESSFUL, INTERNAL_SERVER_ERROR} = messages;

describe(`Testing POST "${version}/adjacency"`, () => {
  beforeAll(async () => {
    server = await initServer();
  });

  afterAll(async () => {
    server.close();
  });

  it(`should have a successful response`, async () => {
    // Adjacency in Y axis
    const payload: AdjacencyRequest = {
      rect1: {x1: 85, y1: 65, x2: 170, y2: 105},
      rect2: {x1: 80, y1: 20, x2: 200, y2: 65},
    };

    const reply = await request(server)
      .post(`${version}/adjacency`)
      .send(payload);
    const outData: AdjacencyResponse = reply.body.data;

    expect(reply.statusCode).toEqual(200);
    expect(reply.body.message).toBe(SUCCESSFUL.message);
    expect(outData.adjacentLine).toStrictEqual({
      x1: 85,
      y1: 65,
      x2: 170,
      y2: 65,
    });
    expect(outData.message).toEqual('Matched adjacent line');
  });

  it(`should return a 500 error when the payload is not valid`, async () => {
    const payload: AdjacencyRequest = {
      rect1: {x1: 55, y1: 30, x2: 90, y2: 50},
      rect2: null,
    };

    const reply = await request(server)
      .post(`${version}/adjacency`)
      .send(payload);
    const response: ServerResponse = reply.body;

    expect(response.statusCode).toBe(500);
    expect(response.message).toBe(INTERNAL_SERVER_ERROR.message);
    expect(response.success).toBe(false);
    expect(response.error.message).toMatch('Cannot read properties of null');
    expect(response.error.stack).toBeDefined();
  });
});
