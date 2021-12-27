if (process.env.NODE_ENV != 'production') require('dotenv').config();

import 'reflect-metadata';
import createServer from './createServer';

(async () => {
  const port = parseInt(<string>process.env.PORT, 10) || 4000;

  const app = await createServer();

  app.listen(port, () => {
    console.log(`Server running in port ${port}`);
  });
})();
