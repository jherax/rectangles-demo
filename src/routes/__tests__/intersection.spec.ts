import type {Server} from 'http';
import {agent as request} from 'supertest';

import type {
  IntersectionRequest,
  IntersectionResponse,
} from '../../../types/Requests';
import {initServer} from '../../server';
import config from '../../server/config';
import messages from '../../server/messages';

let server: Server;
const version = config.app.apiPrefix;
const {SUCCESSFUL, INCOMPLETE_REQUEST} = messages;

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
    const response: IntersectionResponse = reply.body;

    expect(reply.statusCode).toEqual(200);
    expect(response.message).toBe(SUCCESSFUL.message);
    expect(response.data.intersection).toStrictEqual({
      x1: 35,
      y1: 20,
      x2: 55,
      y2: 40,
    });
    expect(response.data.message).toEqual('Intersection with overlap');
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

    expect(response.statusCode).toBe(422);
    expect(response.message).toBe(INCOMPLETE_REQUEST.message);
    expect(response.success).toBe(false);
    expect(response.error.message).toMatch('Invalid object in the payload');
    expect(response.error.stack).toBeDefined();
  });
});
