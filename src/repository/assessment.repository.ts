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
}

export default AssessmentRepository;
