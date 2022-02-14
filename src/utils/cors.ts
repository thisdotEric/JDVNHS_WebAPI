import cors, { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: `${process.env.JDVNHS_WEBAPP}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Origin, X-Requested-With, Content-Type, Accept'],
};

export default cors(corsOptions);
