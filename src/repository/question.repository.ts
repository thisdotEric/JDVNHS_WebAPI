import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import { QUESTIONS } from '../constant/tables';

export type QuestionLevel = 'easy' | 'average' | 'hard';

@injectable()
class QuestionRepository {
  constructor(@inject(TYPES.IDatabase) private readonly db: KnexQueryBuilder) {}

  async getQuestions(learning_competency_code: string) {
    const questions = await this.db
      .getDbInstance()(QUESTIONS)
      .where({ code: learning_competency_code })
      .select('*');

    return questions;
  }
}

export default QuestionRepository;
