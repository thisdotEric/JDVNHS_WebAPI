import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import { DbConstants } from '../constant/db.constants';
import { ASSESSMENT } from '../../src/constant/tables';

@injectable()
class AssessmentScoresRepository {
  constructor(@inject(TYPES.IDatabase) private readonly db: KnexQueryBuilder) {}

  async getScoresByAssessmentId(assessment_id: number) {
    const scores = await this.db
      .getDbInstance()(DbConstants.SCORES_TABLE)
      .where({ assessment_id });

    return scores;
  }

  async getAssessmentInfo(assessment_id: number) {
    const assessmentInfo = await this.db
      .getDbInstance()(ASSESSMENT)
      .where({ assessment_id });

    return assessmentInfo;
  }

  async getAllAssessmentInfo(subject_id: string) {
    const assessmentInfo = await this.db
      .getDbInstance()(ASSESSMENT)
      .where({ subject_id })
      .orderBy('date', 'desc');

    return assessmentInfo;
  }
}

export default AssessmentScoresRepository;
