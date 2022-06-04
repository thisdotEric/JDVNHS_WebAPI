import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(DbConstants.ATTENDANCE_TABLE).del();

  let attendance = [];

  const start = 10;
  const end = 50;

  let LRN: string = '';

  const id = await knex(DbConstants.LECTURE_TABLE)
    .returning('lecture_id')
    .insert({
      lecture_date: '2021-12-16',
      subject_id: 'Math10',
      grading_period: 1,
    });

  for (let count = start; count <= end; count++) {
    LRN = `1234567891${count}`;

    attendance.push({
      lecture_id: id[0],
      LRN,
      status: 'present',
    });
  }

  // Inserts seed entries
  await knex(DbConstants.ATTENDANCE_TABLE).insert(attendance);
}
