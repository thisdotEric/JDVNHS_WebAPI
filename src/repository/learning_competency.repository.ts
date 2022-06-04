import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import { LEARNING_COMPETENCY, QUESTIONS } from '../constant/tables';

export type QuestionLevel = 'easy' | 'average' | 'hard';

@injectable()
class LearningCompetencyRepository {
  constructor(@inject(TYPES.IDatabase) private readonly db: KnexQueryBuilder) {}

  async getLearningCompetencies(subject_id: string, grading_period: number) {
    const learningCompetencies = await this.db
      .getDbInstance()(LEARNING_COMPETENCY)
      .where({
        grading_period,
        subject_id,
      });

    return learningCompetencies;
  }
}

export default LearningCompetencyRepository;
