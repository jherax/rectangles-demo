import type {Server} from 'http';
import {agent as request} from 'supertest';

import type {
  ContainmentRequest,
  ContainmentResponse,
} from '../../../types/Requests';
import {initServer} from '../../server';
import config from '../../server/config';
import messages from '../../server/messages';

let server: Server;
const version = config.app.apiPrefix;
const {SUCCESSFUL, INCOMPLETE_REQUEST} = messages;

describe(`Testing POST "${version}/containment"`, () => {
  beforeAll(async () => {
    server = await initServer();
  });

  afterAll(async () => {
    server.close();
  });

  it(`should have a successful response`, async () => {
    // smallRect inside bigRect, sharing boundary in X axis
    const payload: ContainmentRequest = {
      bigRect: {x1: 10, y1: 5, x2: 90, y2: 65},
      smallRect: {x1: 55, y1: 30, x2: 90, y2: 50},
    };

    const reply = await request(server)
      .post(`${version}/containment`)
      .send(payload);
    const response: ContainmentResponse = reply.body;

    expect(reply.statusCode).toEqual(200);
    expect(response.message).toBe(SUCCESSFUL.message);
    expect(response.data.isContained).toEqual(true);
    expect(response.data.message).toEqual('smallRect is contained by bigRect');
  });

  it(`should return a 500 error when the payload is not valid`, async () => {
    const payload: ContainmentRequest = {
      bigRect: null,
      smallRect: {x1: 55, y1: 30, x2: 90, y2: 50},
    };

    const reply = await request(server)
      .post(`${version}/containment`)
      .send(payload);
    const response: ServerResponse = reply.body;

    expect(response.statusCode).toBe(422);
    expect(response.message).toBe(INCOMPLETE_REQUEST.message);
    expect(response.success).toBe(false);
    expect(response.error.message).toMatch('Invalid object in the payload');
    expect(response.error.stack).toBeDefined();
  });
});
