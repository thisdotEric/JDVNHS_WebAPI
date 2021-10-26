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
import SubjectService from '../services/subject.service';
import TYPES from '../ioc/binding-types';

@controller('/subject')
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
    async getSubjectTeacher(
        @request() req: Request,
        @response() res: Response
    ) {
        const subjectTeacher = await this.subjectService.getSubjectTeacher(
            req.params.subject_name
        );

        const response = JsonResponse.success(subjectTeacher, 200);
        res.status(response.statusCode).send(response);
    }

    @httpGet('/:subject_name/attendance')
    async getStudentAttendanceByMonth(
        @request() req: Request,
        @response() res: Response
    ) {
        const month = `${req.query.month}`;
        const LRN = `${req.query.LRN}`;

        const attendance =
            await this.subjectService.getStudentAttendanceByMonth(month, LRN);

        const response = JsonResponse.success(attendance, 200);
        res.status(response.statusCode).send(response);
    }
}

export default SubjectController;
