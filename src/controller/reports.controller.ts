import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import TYPES from '../ioc/binding-types';
import GradesService from '../services/grades.service';
import { inject } from 'inversify';
import JsonResponse from '../utils/JsonResponse';

@controller('/reports')
export class ReportsController {
  constructor(
    @inject(TYPES.GradesService) private readonly gradesService: GradesService
  ) {}

  @httpGet('/:LRN', TYPES.AuthMiddleware, TYPES.TeacherAccessONLY)
  async getStudentReport(req: Request, res: Response) {
    const LRN = `${req.params.LRN}`;
    const subject_id = `${req.query.subject_id}`;

    const student = {
      first_name: 'John Eric',
      middle_name: 'John Eric',
      last_name: 'John Eric',
    };

    const response = JsonResponse.success({ student, LRN, subject_id }, 200);
    res.status(response.statusCode).send(response);
  }
}
