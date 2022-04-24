import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

function addDays(date: Date, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function randomize(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

interface Assessment {
  grading_period: number;
  subject_id: string;
  items: number;
  component: string;
  date: string | Date;
}

export async function seed(knex: Knex): Promise<void> {
  await knex(DbConstants.SCORES_TABLE).del();
  await knex(DbConstants.ASSESSMENT_TABLE).del();

  const grading_periods = [1, 2, 3, 4];
  const subject_id = 'Math7';

  let assessmentList: Assessment[] = [];

  let date = new Date();

  for (let grading_period of grading_periods) {
    for (let i = 0; i < 7; i++) {
      date = addDays(date, randomize(3, 7));
      assessmentList.push({
        date,
        subject_id,
        items: randomize(20, 35),
        component: 'WW',
        grading_period,
      });
    }

    for (let i = 0; i < 6; i++) {
      date = addDays(date, randomize(3, 7));
      assessmentList.push({
        date,
        subject_id,
        items: randomize(20, 35),
        component: 'PT',
        grading_period,
      });
    }

    date = addDays(date, randomize(3, 7));
    assessmentList.push({
      date,
      subject_id,
      items: 50,
      component: 'QA',
      grading_period,
    });
  }

  await knex(DbConstants.ASSESSMENT_TABLE).insert(assessmentList);

  const assessments = await knex(DbConstants.ASSESSMENT_TABLE).select('*');

  let studentScores = [];

  // Seed 20 students
  const start = 10;
  const end = 50;

  let LRN;

  let score: number = 20;

  for (let assessment of assessments) {
    for (let count = start; count <= end; count++) {
      LRN = `1234567891${count}`;

      score = randomize(
        assessment.component === 'QA' ? 20 : 10,
        assessment.items as number
      );

      studentScores.push({
        assessment_id: assessment.assessment_id,
        grading_period: assessment.grading_period,
        LRN,
        score,
      });
    }
  }

  await knex(DbConstants.SCORES_TABLE).insert(studentScores);
}
