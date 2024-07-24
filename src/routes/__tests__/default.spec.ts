import express from 'express';
import type {Server} from 'http';
import {agent as request} from 'supertest';

import {initServer} from '../../server';
import messages from '../../server/messages';
import defaultRoutes from '../default';

const {NOT_FOUND} = messages;
let server: Server;

beforeAll(async () => {
  server = await initServer();
});

afterAll(() => {
  server.close();
});

describe("Testing router's default paths", () => {
  it('should serve the README file when calling GET "/"', async () => {
    const reply = await request(server).get('/');
    expect(reply.statusCode).toBe(200);
    expect(reply.text).toMatch('Analyzing Rectangles');
    expect(reply.type).toBe('text/html');
  });

  it('should get an image when calling GET "/public"', async () => {
    const reply = await request(server).get('/public/rectangles-cases-02.gif');
    expect(reply.statusCode).toBe(200);
    expect(reply.body).toBeInstanceOf(Buffer);
    expect(reply.type).toBe('image/gif');
  });

  it('should set up Swagger UI endpoints', () => {
    const app = express();
    defaultRoutes(app);
    const routes = app._router.stack.filter(({name}) => name === 'serveStatic');
    ['/docs', '/openapi', '/swagger'].forEach(path => {
      expect(routes.some(({regexp}) => regexp.test(path))).toBe(true);
    });
  });
});

describe('Testing non-existing paths', () => {
  it('should get a 404 status code', async () => {
    const reply = await request(server).get('/unreal');
    const response: ServerResponse = reply.body;

    expect(reply.statusCode).toBe(404);
    expect(response.message).toBe(NOT_FOUND.message);
    expect(response.success).toBe(false);
    expect(reply.type).toBe('application/json');
  });
});
