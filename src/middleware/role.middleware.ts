import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

type Role = 'student' | 'teacher';

function hasAccess(must: Role, role: string) {
  return must === role;
}

@injectable()
export class StudentAccessONLY extends BaseMiddleware {
  public handler(req: Request, res: Response, next: NextFunction) {
    if (hasAccess('student', req.session.user?.role as string)) next();
    else res.status(400).send('Unauthorized');
  }
}

@injectable()
export class TeacherAccessONLY extends BaseMiddleware {
  public handler(req: Request, res: Response, next: NextFunction) {
    if (hasAccess('teacher', req.session.user?.role as string)) next();
    else res.status(400).send('Unauthorized');
  }
}
