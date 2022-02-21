import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

@injectable()
export class MustBeAuthenticated extends BaseMiddleware {
  public handler(req: Request, res: Response, next: NextFunction) {
    if (req.session.user == null)
      res.status(400).send('Not Authenticated. Login <a href="/">here</a>.');
    else next();
  }
}
