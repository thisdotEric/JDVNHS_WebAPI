import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';

@controller('/')
export class HomeContoller {
    @httpGet('/')
    async index(req: Request, res: Response) {
        res.status(200).send('JDVNHS WebAPI');
    }
}
