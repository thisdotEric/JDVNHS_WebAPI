import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function seed(knex: Knex): Promise<void> {
  await knex(DbConstants.SCORES_TABLE).del();
  await knex(DbConstants.ASSESSMENT_TABLE).del();

  const assessments = [
    { date: '2021-12-15', subject_id: 'PreCal', items: 50, component: 'WW' },
    { date: '2022-01-10', subject_id: 'PreCal', items: 20, component: 'QA' },
    { date: '2022-01-15', subject_id: 'PreCal', items: 5, component: 'PT' },
    { date: '2022-02-15', subject_id: 'PreCal', items: 15, component: 'WW' },
    { date: '2022-03-05', subject_id: 'PreCal', items: 30, component: 'WW' },
    { date: '2021-12-15', subject_id: 'MMW1', items: 100, component: 'PT' },
  ];

  await knex(DbConstants.ASSESSMENT_TABLE).insert(assessments);

  const assessment_ids = await knex(DbConstants.ASSESSMENT_TABLE).select(
    'assessment_id'
  );

  let studentScores = [];

  // Seed 20 students
  const start = 10;
  const end = 50;

  let LRN: string = '';

  for (let count = start; count <= end; count++) {
    LRN = `1234567891${count}`;
    studentScores.push({
      assessment_id: assessment_ids[0].assessment_id,
      grading_period: 1,
      LRN,
      score: Math.floor(Math.random() * assessments[0].items) + 1,
    });

    studentScores.push({
      assessment_id: assessment_ids[1].assessment_id,
      grading_period: 1,
      LRN,
      score: Math.floor(Math.random() * assessments[1].items) + 1,
    });

    studentScores.push({
      assessment_id: assessment_ids[2].assessment_id,
      grading_period: 1,
      LRN,
      score: Math.floor(Math.random() * assessments[2].items) + 1,
    });

    studentScores.push({
      assessment_id: assessment_ids[3].assessment_id,
      grading_period: 1,
      LRN,
      score: Math.floor(Math.random() * assessments[3].items) + 1,
    });

    studentScores.push({
      assessment_id: assessment_ids[4].assessment_id,
      grading_period: 1,
      LRN,
      score: Math.floor(Math.random() * assessments[4].items) + 1,
    });

    studentScores.push({
      assessment_id: assessment_ids[5].assessment_id,
      grading_period: 1,
      LRN,
      score: Math.floor(Math.random() * assessments[5].items) + 1,
    });
  }

  await knex(DbConstants.SCORES_TABLE).insert(studentScores);
}
