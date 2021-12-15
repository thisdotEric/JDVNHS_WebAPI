if (process.env.NODE_ENV != 'production') require('dotenv').config();

import 'reflect-metadata';
import container from './ioc/ioc-container';
import { InversifyExpressServer } from 'inversify-express-utils';
import express from 'express';
import exceptionsMiddleware from './middleware/exceptions.middleware';
import cors from './utils/cors';

// Controllers
import './controller/home.controller';
import './controller/student.controller';
import './controller/subject.controller';
import './controller/authentication.controller';

const server = new InversifyExpressServer(container, null, { rootPath: '/v1' });

// Catch all exceptions thrown from any part of the application
server.setErrorConfig(app => {
  app.use(exceptionsMiddleware);
});

// Add all the necessary middlewares
server.setConfig(app => {
  app.use(cors);
  app.use(express.json());
});

const app = server.build();

const port = parseInt(<string>process.env.PORT, 10) || 4000;

export default app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
