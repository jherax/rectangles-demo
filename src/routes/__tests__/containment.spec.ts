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
const endpoint = config.app.apiPrefix + '/containment';
const {SUCCESSFUL, INCOMPLETE_REQUEST, INTERNAL_SERVER_ERROR} = messages;

beforeAll(async () => {
  server = await initServer();
});

afterAll(async () => {
  server.close();
});

describe(`Testing successful POST "${endpoint}"`, () => {
  it(`smallRect should be contained in bigRect`, async () => {
    // smallRect inside bigRect, sharing boundary in X axis
    const payload: ContainmentRequest = {
      bigRect: {x1: 10, y1: 5, x2: 90, y2: 65},
      smallRect: {x1: 55, y1: 30, x2: 90, y2: 50},
    };

    const reply = await request(server).post(`${endpoint}`).send(payload);
    const response: ContainmentResponse = reply.body;

    expect(reply.statusCode).toEqual(200);
    expect(response.message).toBe(SUCCESSFUL.message);
    expect(response.data.isContained).toEqual(true);
    expect(response.data.message).toEqual('smallRect is contained by bigRect');
  });
});

describe(`Testing failed POST "${endpoint}"`, () => {
  it(`should return a 422 error when the payload is not valid`, async () => {
    const payload: ContainmentRequest = {
      bigRect: null,
      smallRect: {x1: 55, y1: 30, x2: 90, y2: 50},
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
    const payload: ContainmentRequest = {
      bigRect: {x1: 55, y1: 0, x2: 90, y2: 60},
      smallRect: {x1: 30, y1: 10, x2: 30, y2: 40},
    };

    const reply = await request(server).post(`${endpoint}`).send(payload);
    const response: ServerResponse = reply.body;

    expect(response.statusCode).toBe(500);
    expect(response.message).toBe(INTERNAL_SERVER_ERROR.message);
    expect(response.success).toBe(false);
    expect(response.error.stack).toBeDefined();
    expect(response.error.message).toMatch(
      'X axis cannot be the same on both points',
    );
  });
});
