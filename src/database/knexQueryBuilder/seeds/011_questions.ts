import * as Knex from 'knex';
import { QUESTIONS } from '../../../constant/tables';
import { questionBank } from '../questionbank';

export interface QuestionItem {
  code: string;
  question: string;
  question_type: 'introductory' | 'enabling' | 'demonstrative';
}

export async function seed(knex: Knex): Promise<void> {
  await knex(QUESTIONS).del();

  let allQuestions: QuestionItem[] = [];

  for (let question of questionBank) {
    // Introductory
    question.introduction.forEach(q =>
      allQuestions.push({
        code: question.code,
        question: q,
        question_type: 'introductory',
      })
    );

    // Enabling
    question.enabling.forEach(q =>
      allQuestions.push({
        code: question.code,
        question: q,
        question_type: 'enabling',
      })
    );

    // Demonstrative
    question.demonstrative.forEach(q =>
      allQuestions.push({
        code: question.code,
        question: q,
        question_type: 'demonstrative',
      })
    );
  }

  await knex(QUESTIONS).insert(allQuestions.map(q => q));
}
