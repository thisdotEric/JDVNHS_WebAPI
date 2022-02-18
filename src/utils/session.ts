import { SessionOptions } from 'express-session';
import connectSessionKnex from 'connect-session-knex';
import session from 'express-session';
import configs from '../database/knexQueryBuilder/knexfile';
import Knex from 'knex';

const SESSION_TTL = 6.048e8; // 7 days

const KnexSessionStore = connectSessionKnex(session);
const store = new KnexSessionStore({
  tablename: 'sessions',
  knex: Knex(configs[`${process.env.NODE_ENV}`]) as any,
});

const sessionConfig: SessionOptions = {
  secret: `${process.env.SESSION_SECRET}`,
  resave: false,
  saveUninitialized: false,
  name: 'sid',
  store,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_TTL,
    domain: `${process.env.JDVNHS_DOMAIN}`,
  },
};

export default session(sessionConfig);
