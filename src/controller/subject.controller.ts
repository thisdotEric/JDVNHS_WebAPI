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

  // Todo, improve route naming
  // Do not move this piece of code
  @httpGet('/:subject_name/attendance/valid')
  async getValidAttendance(@request() req: Request, @response() res: Response) {
    const subject_id = `${req.params.subject_name}`;

    const allLectures = await this.subjectService.getLecturesWithAttendance(
      subject_id
    );

    const response = JsonResponse.success(allLectures, 200);
    res.status(response.statusCode).send(response);
  }

  // Tobe removed
  @httpGet('/:subject_name/attendance/:date')
  async getStudentAttendanceByMonth(
    @request() req: Request,
    @response() res: Response
  ) {
    const lecture_date = `${req.params.date}`;
    const subject_id = `${req.params.subject_name}`;

    try {
      const attendance = await this.subjectService.getClassAttendance(
        subject_id,
        lecture_date
      );

      const response = JsonResponse.success(attendance, 200);
      res.status(response.statusCode).send(response);
    } catch (error) {
      res.status(404).send('Not Found');
    }
  }

  @httpGet('/:subject_name/attendance')
  async getClassAttendance(@request() req: Request, @response() res: Response) {
    const subject_id = `${req.params.subject_name}`;

    console.log(req.query);

    if (req.query.id === 'latest') {
      const attendance = await this.subjectService.getLatestAttendance(
        subject_id
      );

      const response = JsonResponse.success(attendance, 200);
      res.status(response.statusCode).send(response);
    } else {
      const lecture_id = parseInt(req.query.id as string, 10);

      console.log('Lecture Id', lecture_id);

      try {
        const attendance =
          await this.subjectService.getClassAttendanceByLectureId(lecture_id);
        const response = JsonResponse.success(attendance, 200);
        res.status(response.statusCode).send(response);
      } catch (error) {
        res.status(404).send('Not Found');
      }
    }
  }

  @httpPatch('/:subject_name/attendance/:lecture_id')
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
    const { attendance, lecture_id } = req.body;
    const subject_id = `${req.params.subject_name}`;

    const attendanceWithLectureId = attendance.map((at: any) => {
      return {
        lecture_id,
        LRN: at.LRN,
        status: at.status,
      };
    });

    await this.subjectService.addNewAttendanceRecord(attendanceWithLectureId);

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
    const assessment_id = parseInt(req.params.assessment_id, 10);

    const scores = await this.subjectService.getScoresByAssessmentId(
      assessment_id
    );

    const response = JsonResponse.success(scores, 200);
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

  @httpGet('/:subject_name/lecture-dates')
  async getValidLectureDates(
    @request() req: Request,
    @response() res: Response
  ) {
    const teacher_id = `${req.query.teacher}`;
    const subject_id = `${req.params.subject_name}`;

    const lecture_dates = await this.subjectService.getValidLectureDates(
      teacher_id,
      subject_id
    );

    const response = JsonResponse.success(lecture_dates, 200);
    res.status(response.statusCode).send(response);
  }

  @httpGet('/:subject_name/assessments/all')
  async getAllAssessments(@request() req: Request, @response() res: Response) {
    const subject_id = `${req.params.subject_name}`;

    const allAssessments = await this.subjectService.getAllAssessmentsInfo(
      subject_id
    );

    const response = JsonResponse.success(allAssessments, 200);
    res.status(response.statusCode).send(response);
  }

  @httpGet('/:subject_name/lectures')
  async getAllLectures(@request() req: Request, @response() res: Response) {
    const subject_id = `${req.params.subject_name}`;

    const allLectures = await this.subjectService.getAllLectures(subject_id);

    const response = JsonResponse.success(allLectures, 200);
    res.status(response.statusCode).send(response);
  }

  @httpPatch('/:subject_name/assessments/scores')
  async updateAssessmentScores(
    @request() req: Request,
    @response() res: Response
  ) {
    const subject_id = `${req.params.subject_name}`;
    const { scores } = req.body;

    await this.subjectService.updateAssessmentScores(scores);

    const response = JsonResponse.success('Ok', 200);
    res.status(response.statusCode).send(response);
  }

  @httpPost('/:subject_name/assessment')
  async addNewAssessment(@request() req: Request, @response() res: Response) {
    const subject_id = `${req.params.subject_name}`;
    const { assessment } = req.body;

    const addedAssessment = await this.subjectService.addNewAssessment(
      assessment
    );

    const response = JsonResponse.success(addedAssessment, 200);
    res.status(response.statusCode).send(response);
  }

  @httpDelete('/:subject_name/assessment/:assessment_id')
  async removeAssessment(@request() req: Request, @response() res: Response) {
    const subject_id = `${req.params.subject_name}`;
    const assessment_id = parseInt(`${req.params.assessment_id}`, 10);

    await this.subjectService.removeAssessment(assessment_id);

    const response = JsonResponse.success('Ok', 200);
    res.status(response.statusCode).send(response);
  }

  @httpGet('/:subject_name/assessments/scores/valid')
  async getAllAssessmentsWithScores(
    @request() req: Request,
    @response() res: Response
  ) {
    const subject_id = `${req.params.subject_name}`;

    const allAssessmentsWithScores =
      await this.subjectService.getAllAssessmentsWithScores(subject_id);

    const response = JsonResponse.success(allAssessmentsWithScores, 200);
    res.status(response.statusCode).send(response);
  }
}

export default SubjectController;
