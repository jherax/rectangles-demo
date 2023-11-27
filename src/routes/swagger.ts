import {type Express} from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import packageJson from '../../package.json';
import config from '../server/config';

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: packageJson.description,
      version: packageJson.version,
      description: 'APIs documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: packageJson.author.split('<')[0].trim(),
        url: 'https://github.com/jherax',
        email: 'jherax@gmail.com',
      },
    },
    servers: [
      {
        url: `http://${config.app.host}:${config.app.port}`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export default function useSwagger(app: Express) {
  const specs = swaggerJsdoc(options);
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {explorer: true}),
  );
}
