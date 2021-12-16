import {
  controller,
  httpGet,
  httpPut,
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

  @httpPut('/')
  async updateStudentInformation(
    @request() req: Request,
    @response() res: Response
  ) {
    const { updatedStudent } = req.body;

    console.log(updatedStudent);
    await this.studentService.updateStudentInformation(updatedStudent);

    const response = JsonResponse.success('Ok', 200);
    res.status(response.statusCode).send(response);
  }
}

export default StudentController;
