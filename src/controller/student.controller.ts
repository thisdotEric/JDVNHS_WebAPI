import {
  controller,
  httpGet,
  BaseHttpController,
  request,
  response,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import JsonResponse from '../utils/JsonResponse';
import StudentService from '../services/student.service';
import TYPES from '../ioc/binding-types';

@controller('/student')
class StudentController extends BaseHttpController {
  constructor(
    @inject(TYPES.StudentService)
    private readonly studentService: StudentService
  ) {
    super();
  }

  @httpGet('/:lrn')
  async all(@request() req: Request, @response() res: Response) {
    const student = await this.studentService.getStudentByLRN(req.params.lrn);

    const response = JsonResponse.success(student, 200);
    res.status(response.statusCode).send(response);
  }
}

export default StudentController;
