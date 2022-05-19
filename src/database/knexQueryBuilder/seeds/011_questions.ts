import * as Knex from 'knex';
import { QUESTIONS } from '../../../constant/tables';
import { questionBank } from './questionbank';

export interface QuestionItem {
  type: 'standard' | 'multiple';
  questions: string[] | string;
  choices?: string[];
  description?: string;
}

export async function seed(knex: Knex): Promise<void> {
  // await knex(QUESTIONS).del();

  const code = 'M7NS-Ia-1';

  console.log(questionBank);

  const questions: QuestionItem[] = [
    {
      type: 'standard',
      description: `
        Consider the sets:
          A= {1, 3, 5,}                                           
          B= {2,4,6, }
          C= {0,1,2,3,4,……}
          D= the odd numbers less than 7                                            
          E= the whole numbers less than 7
        `,
      questions: [
        'Name the elements of set A',
        'Name the elements of set C',
        'Is set D a subset of set C? Why?',
        'Is set C a subset of set D? Why?',
      ],
    },
    {
      type: 'standard',
      questions: 'Let B = [1, 3, 5, 7, 9}. List all the possible subsets of B.',
    },
  ];

  // await knex(QUESTIONS).insert(
  //   questions.map(question => {
  //     return {
  //       code,
  //       question: JSON.stringify(question),
  //       question_type: 'Introductory',
  //     };
  //   })
  // );
}
