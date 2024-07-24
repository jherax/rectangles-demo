import env from 'dotenv';

env.config();

const config = {
  app: {
    host: process.env.APP_HOST || 'localhost',
    port: process.env.APP_PORT || 3004,
    public: {
      images: '/public/img/',
      html: '/public/html/',
    },
    apiPrefix: '/api/v1',
    maxRequests: +process.env.MAX_REQUESTS_PER_WINDOW || 100,
  },
};

export default config;
