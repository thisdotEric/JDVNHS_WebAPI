if (process.env.NODE_ENV != 'production') require('dotenv').config();

import 'reflect-metadata';
import bindings from './ioc/ioc-container';
import { InversifyExpressServer } from 'inversify-express-utils';
import express, { Response } from 'express';
import exceptionsMiddleware from './middleware/exceptions.middleware';
import cors from './utils/cors';
import { Container } from 'inversify';
import { join } from 'path';

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
    rootPath: '/api',
  });

  // Catch all exceptions thrown from any part of the application
  server.setErrorConfig(app => {
    app.use(exceptionsMiddleware);

    /**
     * To avoid confusing expressJs on routes,
     * React frontend will be serve on any invalid routes.
     * The react router will then serve the appropriate user interface based on the link entered.
     * React is also in charged of the 404 page.
     * This way the api/v1 will still be accessible and will not be redirected to react app
     * had we serve the frontend on setConfig function below.
     */

    app.use((_, res: Response) => {
      if (process.env.NODE_ENV === 'production')
        res.sendFile(join(__dirname, '../../webapp/build', 'index.html'));
      else res.sendFile(join(__dirname, '../webapp/build', 'index.html'));
    });
  });

  // Add all the necessary middlewares
  server.setConfig(app => {
    app.use(cors);
    app.use(express.json());

    app.use(express.static(join(__dirname, '../webapp/build')));
  });

  const app = server.build();

  return app;
}

export default createServer;
