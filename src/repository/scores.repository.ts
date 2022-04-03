import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import { ASSESSMENT, SCORES } from '../constant/tables';

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
      .getDbInstance()
      .raw(
        `select s."score_id", s."LRN", u."first_name", u."middle_name", u."last_name", s."score" from scores s join users u on u."user_id" = s."LRN" where s."assessment_id" = ${assessment_id};`
      );

    return scores.rows;
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

  async getComponentsTotalItem(
    subject_id: string,
    component: string,
    grading_period: number
  ): Promise<number> {
    const totalScore = await this.db
      .getDbInstance()(ASSESSMENT)
      .where({
        subject_id,
        component,
        grading_period,
      })
      .sum('items as total_items')
      .first();

    return totalScore ? parseInt(totalScore.total_items, 10) : 0;
  }

  async getScores(
    subject_id: string,
    component: string,
    grading_period: number
  ) {
    let query = `select s."LRN", SUM(s."score") as total_score from scores s join assessments a on a."assessment_id" = s."assessment_id" where a."component" = '${component}' AND a."grading_period" = '${grading_period}' AND a."subject_id" = '${subject_id}'  group by s."LRN";
    `;

    const totalScores = await this.db.getDbInstance().raw(query);

    return totalScores.rows;
  }

  async getTotalStudentRawScore(
    subject_id: string,
    grading_period: number,
    component: string,
    LRN: string
  ): Promise<number> {
    const totalStudentRawScore = await this.db
      .getDbInstance()
      .raw(
        `select SUM(s."score") from scores s join assessments a on a."assessment_id" = s."assessment_id" where s."LRN" = '${LRN}' and a."grading_period" = '${grading_period}' and a."component" = '${component}' and a."subject_id" = '${subject_id}'`
      );

    if (totalStudentRawScore.rows.length == 0) return 0;

    return parseInt(totalStudentRawScore.rows[0].sum, 10);
  }

  /// Sum select SUM(s."score") from scores s join assessments a on a."assessment_id" = s."assessment_id" where s."LRN" = '123456789110' and a."grading_period" = '1' and a."component" = 'PT';

  /**
 * 
 * 
 * select s."LRN", s."score" from assessments a join scores s on s."assessment_id" = a."assessment_id" where a."subject_id" = 'Math10' and a."grading_period" = '1' and s."LRN" = '123456789110' and a."component" = 'QA' group by s."LRN", s."score";

/// Sum
select SUM(s."score") from scores s join assessments a on a."assessment_id" = s."assessment_id" where s."LRN" = '123456789110' and a."grading_period" = '1' and a."component" = 'PT';
 */
}

export default AssessmentScoresRepository;
