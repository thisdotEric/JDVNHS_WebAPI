import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import TYPES from '../ioc/binding-types';
import { inject } from 'inversify';
import JsonResponse from '../utils/JsonResponse';
import ReportsService from '../services/reports.service';

export interface LearningCompetencyAnalysis {
  code: string;
  learning_competency: string;
  analysis: 'proficient' | 'notProficient';
}

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

  private async groupLearningCompetency(
    LRN: string,
    subject_id: string,
    grading_period: number
  ): Promise<LearningCompetencyAnalysis[]> {
    let groupings: LearningCompetencyAnalysis[] = [];

    const learning_competency_groupings =
      await this.reportsService.getLearningCompetencyGroupings(
        LRN,
        subject_id,
        grading_period
      );

    for await (const code of learning_competency_groupings.notProficient) {
      const learning_competency =
        await this.reportsService.getLearningCompetencyDetails(code);

      groupings.push({
        code,
        learning_competency,
        analysis: 'notProficient',
      });
    }

    for await (const code of learning_competency_groupings.proficient) {
      const learning_competency =
        await this.reportsService.getLearningCompetencyDetails(code);

      groupings.push({
        code,
        learning_competency,
        analysis: 'proficient',
      });
    }

    return groupings;
  }

  @httpGet(
    '/subject/:subject_id/:grading_period/:LRN',
    TYPES.AuthMiddleware,
    TYPES.TeacherAccessONLY
  )
  async getLearningCompetencyGroupings(req: Request, res: Response) {
    const subject_id = `${req.params.subject_id}`;
    const LRN = `${req.params.LRN}`;
    const grading_period = parseInt(`${req.params.grading_period}`);

    const groupings = await this.groupLearningCompetency(
      LRN,
      subject_id,
      grading_period
    );

    // let groupings: LearningCompetencyAnalysis[] = [];

    // const learning_competency_groupings =
    //   await this.reportsService.getLearningCompetencyGroupings(
    //     LRN,
    //     subject_id,
    //     grading_period
    //   );

    // for await (const code of learning_competency_groupings.notProficient) {
    //   const learning_competency =
    //     await this.reportsService.getLearningCompetencyDetails(code);

    //   groupings.push({
    //     code,
    //     learning_competency,
    //     analysis: 'notProficient',
    //   });
    // }

    // for await (const code of learning_competency_groupings.proficient) {
    //   const learning_competency =
    //     await this.reportsService.getLearningCompetencyDetails(code);

    //   groupings.push({
    //     code,
    //     learning_competency,
    //     analysis: 'proficient',
    //   });
    // }

    // console.log(groupings);

    // console.log(LRN, learning_competency_groupings);

    const response = JsonResponse.success(groupings, 200);
    res.status(response.statusCode).send(response);
  }

  @httpGet('/:subject_name/competencies/:code/questions')
  async getEvaluationQuestions(req: Request, res: Response) {
    const code = `${req.params.code}`;

    const questions = await this.reportsService.getQuestions(code);

    const response = JsonResponse.success(questions, 200);
    res.status(response.statusCode).send(response);
  }

  @httpGet('/:subject_name/materials/:code')
  async getLearningMaterials(req: Request, res: Response) {
    const code = `${req.params.code}`;

    const learningMaterials = await this.reportsService.getLearningMaterials(
      code
    );

    const response = JsonResponse.success(learningMaterials, 200);
    res.status(response.statusCode).send(response);
  }
}
