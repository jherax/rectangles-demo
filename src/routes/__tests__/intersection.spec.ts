import type {Server} from 'http';
import {agent as request} from 'supertest';

import {initServer} from '../../server';
import config from '../../server/config';
import messages from '../../server/messages';

let server: Server;
const version = config.app.apiPrefix;
const {SUCCESSFUL, INTERNAL_SERVER_ERROR} = messages;

describe(`Testing POST "${version}/intersection"`, () => {
  beforeAll(async () => {
    server = await initServer();
  });

  afterAll(async () => {
    server.close();
  });

  it(`should have a successful response`, async () => {
    // intersection in both axis
    const payload: IntersectionRequest = {
      rect1: {x1: 15, y1: 20, x2: 55, y2: 60},
      rect2: {x1: 35, y1: 10, x2: 75, y2: 40},
    };

    const reply = await request(server)
      .post(`${version}/intersection`)
      .send(payload);
    const outData: IntersectionResponse = reply.body.data;

    expect(reply.statusCode).toEqual(200);
    expect(reply.body.message).toBe(SUCCESSFUL.message);
    expect(outData.intersection).toStrictEqual({
      x1: 35,
      y1: 20,
      x2: 55,
      y2: 40,
    });
    expect(outData.message).toEqual('Intersection with overlap');
  });

  it(`should return a 500 error when the payload is not valid`, async () => {
    const payload: IntersectionRequest = {
      rect1: {x1: 55, y1: 30, x2: 90, y2: 50},
      rect2: null,
    };

    const reply = await request(server)
      .post(`${version}/intersection`)
      .send(payload);
    const response: ServerResponse = reply.body;

    expect(response.statusCode).toBe(500);
    expect(response.message).toBe(INTERNAL_SERVER_ERROR.message);
    expect(response.success).toBe(false);
    expect(response.error.message).toMatch('Cannot read properties of null');
    expect(response.error.stack).toBeDefined();
  });
});
