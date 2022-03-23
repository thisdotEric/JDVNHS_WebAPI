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

export interface NewScores {
  assessment_id: number;
  grading_period: 1 | 2 | 3 | 4;
  scores: { LRN: string; score: number }[];
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

  async addNewScores(scores: NewScores) {
    // console.log(scores);

    const insertQueries = [];

    for (let { LRN, score } of scores.scores) {
      insertQueries.push(
        this.db.getDbInstance()(SCORES).insert({
          LRN,
          score,
          grading_period: scores.grading_period,
          assessment_id: scores.assessment_id,
        })
      );
    }

    await Promise.all(insertQueries);
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

  async getAllAssessmentsWithScores(subject_id: string) {
    const allAssessmentsWithScores = await this.db
      .getDbInstance()
      .raw(
        `select distinct a."assessment_id" from assessments a join scores s on s."assessment_id" = a."assessment_id" where subject_id = '${subject_id}'`
      );

    return allAssessmentsWithScores.rows;
  }
}

export default AssessmentScoresRepository;
