import {
  controller,
  httpGet,
  httpPost,
  request,
  response,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import TYPES from '../ioc/binding-types';
import AuthenticationService from '../services/authentication.service';
import { IncompleteRequestBodyException } from '../exceptions';

@controller('/auth')
export class AuthenticationController {
  constructor(
    @inject(TYPES.AuthService)
    private readonly authService: AuthenticationService
  ) {}

  @httpPost('/login')
  async index(@request() req: Request, @response() res: Response) {
    const { user_id, password } = req.body;

    if (!user_id || !password) throw new IncompleteRequestBodyException();

    const authCredentials = await this.authService.login(user_id, password);

    req.session.user = { user_id, role: 'student' };
    res.status(200).send(authCredentials);
  }

  @httpGet('/me')
  async me(@request() req: Request, @response() res: Response) {
    req.session.user = { user_id: '1111111', role: 'student' };
    res.status(200).send({ name: 'John Eric Siguenza' });
  }

  @httpPost('/logout')
  async logout(@request() req: Request, @response() res: Response) {
    req.session.destroy(() => {});
    res.status(200).send('Logged out');
  }
}
