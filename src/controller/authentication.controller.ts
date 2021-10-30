import {
    controller,
    httpGet,
    request,
    response,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import PasswordUtil from '../algorithms/password/password';
import TYPES from '../ioc/binding-types';
import AuthenticationService from '../services/authentication.service';

@controller('/auth')
export class AuthenticationController {
    constructor(
        @inject(TYPES.AuthService)
        private readonly authService: AuthenticationService
    ) {}

    @httpGet('/login')
    async index(@request() req: Request, @response() res: Response) {
        const { id, password } = req.body;
        const authCredentials = await this.authService.login(id, password);

        res.status(200).send(authCredentials);
    }
}
