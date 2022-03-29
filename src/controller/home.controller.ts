import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import Hashids from 'hashids';

@controller('/')
export class HomeController {
  @httpGet('/')
  async index(req: Request, res: Response) {
    const hashids = new Hashids(
      'jdvnhs-webapi',
      10,
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    );

    console.log(hashids.encode(1));

    res.status(200).send('JDVNHS WebAPI');
  }
}
