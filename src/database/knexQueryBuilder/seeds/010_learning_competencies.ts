import * as Knex from 'knex';
import readline from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import {
  LEARNING_COMPETENCY,
  LEARNING_MATERIAL,
} from '../../../constant/tables';
import { learning_materials } from '../learninMaterials';

interface LearningCompetency {
  code: string;
  learning_competency: string;
  grading_period: 1 | 2 | 3 | 4;
  grade_level: 7 | 8 | 9 | 10;
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(LEARNING_MATERIAL).del();
  await knex(LEARNING_COMPETENCY).del();

  var read = readline.createInterface({
    input: createReadStream(join(__dirname, 'learning_competencies.txt')),
  });

  let arr = [];

  const learning_competencies: LearningCompetency[] = [];
  for await (const line of read) {
    arr.push(line);
    if (arr.length == 2) {
      learning_competencies.push({
        code: arr[0],
        learning_competency: arr[1],
        grade_level: 7,
        grading_period: 1,
      });

      arr = [];
    }
  }

  //   // Inserts seed entries
  await knex(LEARNING_COMPETENCY).insert(learning_competencies);
  await knex(LEARNING_MATERIAL).insert(learning_materials);
}
