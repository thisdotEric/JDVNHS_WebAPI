import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import TYPES from '../ioc/binding-types';
import { inject } from 'inversify';
import JsonResponse from '../utils/JsonResponse';
import ReportsService from '../services/reports.service';

@controller('/reports')
export class ReportsController {
  constructor(
    @inject(TYPES.ReportsService)
    private readonly reportsService: ReportsService
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

  @httpGet(
    '/subject/:subject_id',
    TYPES.AuthMiddleware,
    TYPES.TeacherAccessONLY
  )
  async getStudentReporst(req: Request, res: Response) {
    const subject_id = `${req.params.subject_id}`;

    const reports = await this.reportsService.getStudentPerformanceReport(
      subject_id,
      1
    );

    const response = JsonResponse.success(reports, 200);
    res.status(response.statusCode).send(response);
  }

  @httpGet(
    '/subject/:subject_id/:LRN',
    TYPES.AuthMiddleware,
    TYPES.TeacherAccessONLY
  )
  async getPersonalizedRemediation(req: Request, res: Response) {
    const code = 'M7NS-Ia-1';
    const subject_id = 'Math7';
    const LRN = '123456789110';

    // select distinct code from lectures where subject_id = 'Math7' and grading_period = '1';

    await this.reportsService.getStudentReport(LRN, subject_id, 1);

    const questions = await this.reportsService.getQuestions(code);

    const response = JsonResponse.success(questions, 200);
    res.status(response.statusCode).send(response);
  }
}
