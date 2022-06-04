import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import { ASSESSMENT } from '../constant/tables';

export interface Assessment {
  date: string;
  subject_id: string;
  items: number;
  component: 'WW' | 'PT' | 'QA';
  grading_period: 1 | 2 | 3 | 4;
  assessment_type: 'summative' | 'formative';
  lecture_id: number;
}

@injectable()
class AssessmentRepository {
  constructor(@inject(TYPES.IDatabase) private readonly db: KnexQueryBuilder) {}

  async addNewAssessment(assessment: Assessment) {
    let returned_assessment: Assessment[] = [];

    try {
      returned_assessment = await this.db
        .getDbInstance()(ASSESSMENT)
        .insert(assessment)
        .returning('*');
    } catch (error) {
      console.log(error);
    }

    return returned_assessment[0];
  }

  async getAllAssessmentInfo(subject_id: string) {
    const assessmentInfo = await this.db
      .getDbInstance()(ASSESSMENT)
      .where({ subject_id, grading_period: 1 })
      .orderBy('date', 'desc');

    return assessmentInfo;
  }

  async getAssessmentInfo(assessment_id: number) {
    const assessmentInfo = await this.db
      .getDbInstance()(ASSESSMENT)
      .where({ assessment_id });

    return assessmentInfo;
  }

  async removeAssessment(assessment_id: number) {
    await this.db.getDbInstance()(ASSESSMENT).where({ assessment_id }).delete();
  }

  async getAssessmentIdByLectureId(lecture_id: number) {
    // Disregard QA
    const assessment_ids = await this.db
      .getDbInstance()
      .raw(
        `select a."assessment_id" from assessments a join lectures l on a."lecture_id" = l."lecture_id" where l.lecture_id = '${lecture_id}' and a.component != 'QA'`
      );

    return assessment_ids.rows.map((a: any) => a.assessment_id);
  }

  async getAssessmentTotalItemPerLectureIds(
    lecture_ids: number[]
  ): Promise<number> {
    const ids = lecture_ids.map(id => id).join(',');

    // Disregard QA
    const assessmentTotalItem = await this.db
      .getDbInstance()
      .raw(
        `select sum(a."items") from assessments a join lectures l on a."lecture_id" = l."lecture_id" where l.lecture_id in (${ids}) and a.component != 'QA'`
      );

    return parseInt(assessmentTotalItem.rows[0].sum);
  }
}

export default AssessmentRepository;
