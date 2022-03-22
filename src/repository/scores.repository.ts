import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import { DbConstants } from '../constant/db.constants';
import { ASSESSMENT, SCORES } from '../../src/constant/tables';

export interface Score {
  score_id: number;
  assessment_id: number;
  grading_period: 1 | 2 | 3 | 4;
  LRN: string;
  score: number;
}
export interface UpdatedScore {
  score_id: number;
  score: number;
}

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

  async updateAssessmentScores(scores: UpdatedScore[]) {
    let updates: any[] = [];

    for (let { score_id, score } of scores) {
      updates.push(
        this.db.getDbInstance()(SCORES).update({ score }).where({
          score_id,
        })
      );
    }

    await Promise.all(updates);
  }
}

export default AssessmentScoresRepository;
