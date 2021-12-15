import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function seed(knex: Knex): Promise<void> {
  await knex(DbConstants.SCORES_TABLE).del();
  await knex(DbConstants.ASSESSMENT_TABLE).del();

  await knex(DbConstants.ASSESSMENT_TABLE).insert([
    { date: '2021-12-15', subject_id: 'PreCal', items: 50, component: 'WW' },
    { date: '2021-12-15', subject_id: 'MMW1', items: 100, component: 'PT' },
  ]);

  const assessment_ids = await knex(DbConstants.ASSESSMENT_TABLE).select(
    'assessment_id'
  );

  let studentScores = [];

  // Seed 20 students
  const start = 10;
  const end = 20;

  let LRN: string = '';

  for (let count = start; count <= end; count++) {
    LRN = `1234567891${count}`;
    studentScores.push({
      assessment_id: assessment_ids[0].assessment_id,
      grading_period: 1,
      LRN,
      score: Math.floor(Math.random() * 50) + 1,
    });

    studentScores.push({
      assessment_id: assessment_ids[1].assessment_id,
      grading_period: 1,
      LRN,
      score: Math.floor(Math.random() * 100) + 1,
    });
  }

  await knex(DbConstants.SCORES_TABLE).insert(studentScores);
}
