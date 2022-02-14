import * as session from 'express-session';

declare module 'express-session' {
  interface SessionUser {
    user_id: string;
    role: 'student' | 'teacher';
  }

  interface SessionData {
    user: SessionUser;
  }
}
