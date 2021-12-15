import cors, { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: [
    `${process.env.JDVNHS_WEBSITE_LOCALHOST_URL}`,
    `${process.env.JDVNHS_WEBSITE_REMOTE_URL}`,
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
};

export default cors(corsOptions);
