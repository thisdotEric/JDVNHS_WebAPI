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
import {
  buildTree,
  classify,
  StudentAttributes,
} from '../algorithms/cart-decision-tree';

@controller('/subject', TYPES.AuthMiddleware, TYPES.TeacherAccessONLY)
class SubjectController extends BaseHttpController {
  constructor(
    @inject(TYPES.SubjectService)
    private readonly subjectService: SubjectService
  ) {
    super();
  }

  // Scores
  // Assessment
  // Student
  // Lecture
  // Attendance

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

  @httpPatch('/:subject_name/assessments/score')
  async updateSingleAssessmentScore(
    @request() req: Request,
    @response() res: Response
  ) {
    const subject_id = `${req.params.subject_name}`;
    const { score } = req.body;

    try {
      await this.subjectService.updateSingleAssessmentScore(score);
    } catch (error) {
      console.log(error);
    }

    const response = JsonResponse.success('Ok', 200);
    res.status(response.statusCode).send(response);
  }

  @httpPost('/:subject_name/assessments/scores')
  async addAssessmentScores(
    @request() req: Request,
    @response() res: Response
  ) {
    const subject_id = `${req.params.subject_name}`;
    const { assessment_id, grading_period, scores } = req.body;

    const newScores = {
      assessment_id: parseInt(assessment_id, 10),
      grading_period,
      scores,
    };

    await this.subjectService.addNewScores(newScores);

    const response = JsonResponse.success('Ok', 200);
    res.status(response.statusCode).send(response);
  }

  @httpPost('/:subject_name/assessment')
  async addNewAssessment(@request() req: Request, @response() res: Response) {
    const subject_id = `${req.params.subject_name}`;
    const { assessment } = req.body;

    await this.subjectService.addNewAssessment(assessment);

    const response = JsonResponse.success('Ok', 200);
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

  @httpGet('/:subject_name/grades')
  async getClassGrade(@request() req: Request, @response() res: Response) {
    const subject_id = `${req.params.subject_name}`;

    const allAssessmentsWithScores = await this.subjectService.getClassGrades(
      subject_id
    );
    const response = JsonResponse.success('Ok', 200);
    res.status(response.statusCode).send(response);
  }

  @httpGet('/:subject_name/performance')
  async getPerformance(@request() req: Request, @response() res: Response) {
    const subject_id = `${req.params.subject_name}`;
    let prediction;

    try {
      const training_data = await this.subjectService.getStudentPerformance(
        subject_id,
        1
      );

      const node = buildTree(training_data);

      const studentData: StudentAttributes = {
        passedPreTest: false,
        pt_wScore: 90,
        qa_wScore: 80,
        ww_wScore: 100,
      };

      prediction = classify(studentData, node);
    } catch (error) {
      console.log(error);
    }
    const response = JsonResponse.success(prediction, 200);
    res.status(response.statusCode).send(response);
  }

  @httpGet('/:subject_name/:grading_period/competencies')
  async getLearningCompetencies(
    @request() req: Request,
    @response() res: Response
  ) {
    const subject_id = `${req.params.subject_name}`;
    const grading_period = parseInt(`${req.params.grading_period}`);

    const learningCompetencies =
      await this.subjectService.getLearningCompetencies(
        subject_id,
        grading_period
      );

    const response = JsonResponse.success(learningCompetencies, 200);
    res.status(response.statusCode).send(response);
  }

  @httpPost('/:subject_name/lectures')
  async addNewLecture(@request() req: Request, @response() res: Response) {
    const { lecture } = req.body;

    await this.subjectService.addNewLecture(JSON.parse(lecture));

    const response = JsonResponse.success('Ok', 200);
    res.status(response.statusCode).send(response);
  }

  @httpPost('/:subject_name/learning-materials')
  async addNewLearningMaterial(
    @request() req: Request,
    @response() res: Response
  ) {
    const { learningMaterial } = req.body;

    await this.subjectService.addNewLearningMaterial(learningMaterial);

    const response = JsonResponse.success('Ok', 200);
    res.status(response.statusCode).send(response);
  }

  @httpDelete('/:subject_name/learning-materials/:id')
  async deleteLearningCompetency(
    @request() req: Request,
    @response() res: Response
  ) {
    const id = parseInt(`${req.params.id}`);

    await this.subjectService.deleteLearningMaterial(id);

    const response = JsonResponse.success('Ok', 200);
    res.status(response.statusCode).send(response);
  }

  @httpPatch('/:subject_name/questions')
  async updateQuestion(@request() req: Request, @response() res: Response) {
    const { question_id, question, question_type } = req.body;

    console.log(req.body);

    await this.subjectService.updateQuestion(
      question_id,
      question,
      question_type
    );

    const response = JsonResponse.success('Ok', 200);
    res.status(response.statusCode).send(response);
  }

  @httpPost('/:subject_name/questions')
  async addNewQuestion(@request() req: Request, @response() res: Response) {
    const { question } = req.body;

    await this.subjectService.addNewQuestion(question);

    const response = JsonResponse.success('Ok', 200);
    res.status(response.statusCode).send(response);
  }

  @httpDelete('/:subject_name/lectures/:lecture_id')
  async deleteLecture(@request() req: Request, @response() res: Response) {
    const lecture_id = parseInt(`${req.params.lecture_id}`);

    console.log(lecture_id);

    await this.subjectService.deleteLecture(lecture_id);

    const response = JsonResponse.success('Ok', 200);
    res.status(response.statusCode).send(response);
  }

  @httpDelete('/:subject_name/questions/:question_id')
  async deleteQuestion(@request() req: Request, @response() res: Response) {
    const question_id = parseInt(`${req.params.question_id}`);

    await this.subjectService.deleteQuestion(question_id);

    const response = JsonResponse.success('Ok', 200);
    res.status(response.statusCode).send(response);
  }
}

export default SubjectController;
