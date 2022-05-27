import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import { QUESTIONS } from '../constant/tables';

export type QuestionLevel = 'easy' | 'average' | 'hard';

export interface Question {
  question_id?: number;
  code: string;
  question: string;
  question_type: string;
}

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

  async updateQuestion(
    question_id: number,
    question: string,
    question_type: string
  ) {
    console.log(question_id);

    await this.db
      .getDbInstance()(QUESTIONS)
      .update({
        question,
        question_type,
      })
      .where({ question_id });
  }

  async addQuestion(question: Question) {
    await this.db.getDbInstance()(QUESTIONS).insert(question);
  }

  async deleteQuestion(question_id: number) {
    await this.db.getDbInstance()(QUESTIONS).where({ question_id }).delete();
  }
}

export default QuestionRepository;
