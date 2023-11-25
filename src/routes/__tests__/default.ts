import type {Server} from 'http';
import {agent as request} from 'supertest';

import {initServer} from '../../server';

describe('Testing default GET "/"', () => {
  let server: Server;

  beforeAll(async () => {
    server = await initServer();
  });

  afterAll(() => {
    server.close();
  });

  it('responds with status code 200', async () => {
    const reply = await request(server).get('/');

    expect(reply.statusCode).toBe(200);
    expect(reply.text).toBe(getExpectedText());
    expect(reply.type).toBe('text/html');
  });
});

function getExpectedText() {
  return `<h3>Default Page</h3>`;
}
