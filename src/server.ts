import 'reflect-metadata';
import 'dotenv/config';
import container from './ioc/ioc-container';
import { InversifyExpressServer } from 'inversify-express-utils';

// Controllers
import './controller/home.controller';

const server = new InversifyExpressServer(container);

const app = server.build();

const port = parseInt(<string>process.env.PORT, 10) || 4000;

export default app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});
