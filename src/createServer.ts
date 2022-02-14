if (process.env.NODE_ENV != 'production') require('dotenv').config();

import 'reflect-metadata';
import bindings from './ioc/ioc-container';
import { InversifyExpressServer } from 'inversify-express-utils';
import express from 'express';
import exceptionsMiddleware from './middleware/exceptions.middleware';
import cors from './utils/cors';
import { Container } from 'inversify';
import session from './utils/session';

// Controllers
import './controller/home.controller';
import './controller/student.controller';
import './controller/subject.controller';
import './controller/authentication.controller';
import './controller/teacher.controller';

async function createServer() {
  let container = new Container();
  await container.loadAsync(bindings);

  let server = new InversifyExpressServer(container, null, {
    rootPath: '/v1',
  });

  // Catch all exceptions thrown from any part of the application
  server.setErrorConfig(app => {
    app.use(exceptionsMiddleware);
  });

  // Add all the necessary middlewares
  server.setConfig(app => {
    app.use(cors);
    app.use(express.json());
    app.use(session);
  });

  const app = server.build();

  return app;
}

export default createServer;
