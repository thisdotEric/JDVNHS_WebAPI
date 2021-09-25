import 'reflect-metadata';
import 'dotenv/config';
import container from './ioc/ioc-container';
import { InversifyExpressServer } from 'inversify-express-utils';
import express from 'express';
import exceptionsMiddleware from './middleware/exceptions.middleware';

// Controllers
import './controller/home.controller';
import './controller/student.controller';

const server = new InversifyExpressServer(container, null, { rootPath: '/v1' });

server.setErrorConfig(app => {
    app.use(exceptionsMiddleware);
});

server.setConfig(app => {
    app.use(express.json());
});

const app = server.build();

const port = parseInt(<string>process.env.PORT, 10) || 4000;

export default app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});
