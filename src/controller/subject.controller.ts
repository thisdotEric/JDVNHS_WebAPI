import {
  controller,
  httpGet,
  httpDelete,
  httpPost,
  BaseHttpController,
  request,
  response,
  httpPatch,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import JsonResponse from '../utils/JsonResponse';
import SubjectService from '../services/subject.service';
import TYPES from '../ioc/binding-types';

@controller('/subject', TYPES.AuthMiddleware, TYPES.TeacherAccessONLY)
class SubjectController extends BaseHttpController {
  constructor(
    @inject(TYPES.SubjectService)
    private readonly subjectService: SubjectService
  ) {
    super();
  }

  @httpGet('/:subject_name/students')
  async getEnrolledStudents(
    @request() req: Request,
    @response() res: Response
  ) {
    const enrolledStudents = await this.subjectService.getEnrolledStudents(
      req.params.subject_name
    );

    const response = JsonResponse.success(enrolledStudents, 200);
    res.status(response.statusCode).send(response);
  }

  @httpGet('/:subject_name/subject-teacher')
  async getSubjectTeacher(@request() req: Request, @response() res: Response) {
    const subjectTeacher = await this.subjectService.getSubjectTeacher(
      req.params.subject_name
    );

    const response = JsonResponse.success(subjectTeacher, 200);
    res.status(response.statusCode).send(response);
  }

  @httpGet('/:subject_name/attendance/:date')
  async getStudentAttendanceByMonth(
    @request() req: Request,
    @response() res: Response
  ) {
    const lecture_date = `${req.params.date}`;
    const subject_id = `${req.params.subject_name}`;

    const attendance = await this.subjectService.getClassAttendance(
      subject_id,
      lecture_date
    );

    const response = JsonResponse.success(attendance, 200);
    res.status(response.statusCode).send(response);
  }

  @httpPatch('/:subject_name/:lecture_id/attendance')
  async updateStudentAttendance(
    @request() req: Request,
    @response() res: Response
  ) {
    const lecture_id = `${req.params.lecture_id}`;
    const subject_name = `${req.params.subject_name}`;
    const { LRN, newStatus } = req.body;

    console.log(lecture_id, subject_name, LRN, newStatus);

    await this.subjectService.updateAttendance(LRN, newStatus, lecture_id);

    const response = JsonResponse.success('attendance', 200);
    res.status(response.statusCode).send(response);
  }

  @httpPost('/:subject_name/attendance')
  async addNewAttendanceRecord(
    @request() req: Request,
    @response() res: Response
  ) {
    const { attendance, attendance_date } = req.body;
    const subject_id = `${req.params.subject_name}`;

    await this.subjectService.addNewAttendanceRecord(attendance, {
      subject_id,
      lecture_date: attendance_date,
    });

    const response = JsonResponse.success('Ok', 200);
    res.status(response.statusCode).send(response);
  }

  @httpDelete('/:subject_name/students/:lrn')
  async removeStudentFromClass(
    @request() req: Request,
    @response() res: Response
  ) {
    const subject = `${req.params.subject_name}`;
    const lrn = `${req.params.lrn}`;

    const deleted = await this.subjectService.removeStudentFromClass(
      subject,
      lrn
    );

    let data = `Succesfully removed from class ${subject}`;
    let statusCode = 200;

    // Student not found
    if (!deleted) {
      data = `Student not found in class ${subject}`;
      statusCode = 404;
    }

    const response = JsonResponse.success(data, statusCode);
    res.status(response.statusCode).send(response);
  }

  @httpGet('/:subject_name/scores/:assessment_id')
  async getScoresByAssessmentId(
    @request() req: Request,
    @response() res: Response
  ) {
    const subject_id = req.params.subject_name;
    const assessment_id = parseInt(req.params.assessment_id, 10);

    const scores = await this.subjectService.getScoresByAssessmentId(
      assessment_id
    );

    const response = JsonResponse.success({ subject_id, scores }, 200);
    res.status(response.statusCode).send(response);
  }

  @httpGet('/:subject_name/students/count')
  async getEnrolledStudentCount(
    @request() req: Request,
    @response() res: Response
  ) {
    const subject_id = req.params.subject_name;
    const studentCount = await this.subjectService.getEnrolledStudentCount(
      subject_id
    );

    const response = JsonResponse.success(studentCount, 200);
    res.status(response.statusCode).send(response);
  }
}

export default SubjectController;
