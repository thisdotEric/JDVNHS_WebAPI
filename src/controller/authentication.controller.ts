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
import UserService from '../services/user.service';

@controller('/auth')
export class AuthenticationController {
  constructor(
    @inject(TYPES.AuthService)
    private readonly authService: AuthenticationService,
    @inject(TYPES.UserService)
    private readonly userService: UserService
  ) {}

  @httpPost('/login')
  async index(@request() req: Request, @response() res: Response) {
    const { user_id, password } = req.body;

    if (!user_id || !password) throw new IncompleteRequestBodyException();

    const authCredentials = await this.authService.login(user_id, password);
    const user = await this.userService.getUser(user_id);

    req.session.user = { ...user };
    res.status(200).send(authCredentials);
  }

  @httpGet('/me', TYPES.AuthMiddleware)
  async me(@request() req: Request, @response() res: Response) {
    const user_id = req.session.user!.user_id;

    const user = await this.userService.getUser(user_id);

    res.status(200).send(user);
  }

  @httpPost('/logout', TYPES.AuthMiddleware)
  async logout(@request() req: Request, @response() res: Response) {
    req.session.destroy(() => {});
    res.status(200).send('Logged out');
  }
}
