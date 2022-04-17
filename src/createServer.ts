if (process.env.NODE_ENV != 'production') require('dotenv').config();

import 'reflect-metadata';
import bindings from './ioc/ioc-container';
import { InversifyExpressServer } from 'inversify-express-utils';
import express, { Response } from 'express';
import { exceptionsMiddleware } from './middleware';
import cors from './utils/cors';
import { Container } from 'inversify';
import session from './utils/session';
import { join } from 'path';

// Controllers
import './controller/home.controller';
import './controller/student.controller';
import './controller/subject.controller';
import './controller/authentication.controller';
import './controller/teacher.controller';
import './controller/grades.controller';
import './controller/intervention.controller';

const FRONTEND_BUILD_FILES_PATH = '../webapp/build';

async function createServer() {
  let container = new Container();
  await container.loadAsync(bindings);

  let server = new InversifyExpressServer(container, null, {
    rootPath: '/api',
  });

  // Catch all exceptions thrown from any part of the application
  server.setErrorConfig(app => {
    app.use(exceptionsMiddleware);

    /**
     * Serve the frontend app on all invalid routes.
     */
    app.use((_, res: Response) => {
      res.sendFile(join(__dirname, FRONTEND_BUILD_FILES_PATH, 'index.html'));
    });
  });

  // Add all the necessary middlewares
  server.setConfig(app => {
    app.use(cors);
    app.use(express.json());
    app.use(session);
    app.set('trust proxy', 1);

    app.use(express.static(join(__dirname, FRONTEND_BUILD_FILES_PATH)));

    /**
     * Serve the React frontend build files on / (home) endpoint.
     */
    app.get('/', (req, res: Response, next) => {
      /**
       * Important, only serve the frontend on all routes except the /api endpoint
       * else it will be also redirected to the frontend and will not send back data
       */
      if (req.url === '/api') next();

      res.sendFile(join(__dirname, FRONTEND_BUILD_FILES_PATH, 'index.html'));
    });
  });

  const app = server.build();

  return app;
}

export default createServer;
