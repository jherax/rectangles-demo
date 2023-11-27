/**
 * Jest-Timers
 * @see https://jestjs.io/docs/timer-mocks
 *
 * You can call jest.useFakeTimers() or jest.useRealTimers() from anywhere
 * (top level, inside an it block, etc.), but it is a global operation and
 * will affect other tests within the same file.
 *
 * Additionally, you need to call jest.useFakeTimers() to reset internal
 * counters before each test. By default jest uses "modern" timers, then
 * if you want to inspect setTimeout or setInterval you will need to call
 * spyOn() upon those methods. If you use "legacy", that won't be required.
 *
 * @example
 *
 * beforeEach(() => jest.useFakeTimers('legacy'|'modern'))
 * afterEach(() => jest.useRealTimers())
 */

// ---------------------------------
// Jest mock is hoisted before any module import

jest.mock('../src/server/config', () => {
  return {
    app: {
      host: 'localhost',
      port: 8888,
      public: {
        images: '/public/img/',
        html: '/public/html/',
      },
      apiPrefix: '/api/v1',
      maxRequests: 5,
    },
  };
});
