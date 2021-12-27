import {
  controller,
  httpGet,
  request,
  response,
} from 'inversify-express-utils';
import { Request, Response } from 'express';
import TeacherService from '../services/teacher.service';
import { inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import JsonResponse from '../utils/JsonResponse';

@controller('/teacher')
export class TeacherController {
  constructor(
    @inject(TYPES.TeacherService)
    private readonly teacherService: TeacherService
  ) {}

  @httpGet('/:teacher_id/subjects')
  async getHandledSubjects(@request() req: Request, @response() res: Response) {
    const teacher_id = req.params.teacher_id;

    const handledSubjects = await this.teacherService.getHandledSubjects(
      teacher_id
    );

    const response = JsonResponse.success(handledSubjects, 200);
    res.status(response.statusCode).send(response);
  }
}
