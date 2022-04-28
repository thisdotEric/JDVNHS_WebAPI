import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import TYPES from '../ioc/binding-types';
import GradesService from '../services/grades.service';
import { inject } from 'inversify';
import JsonResponse from '../utils/JsonResponse';

@controller('/grades')
export class GradesController {
  constructor(
    @inject(TYPES.GradesService) private readonly gradesService: GradesService
  ) {}

  @httpGet('/:subject_id', TYPES.AuthMiddleware, TYPES.TeacherAccessONLY)
  async index(req: Request, res: Response) {
    const subject_id = `${req.params.subject_id}`;

    let computedScores;

    try {
      computedScores = await this.gradesService.getAllGrades(subject_id);
    } catch (error) {
      console.log(error);
    }

    const response = JsonResponse.success(computedScores, 200);
    res.status(response.statusCode).send(response);
  }
}
