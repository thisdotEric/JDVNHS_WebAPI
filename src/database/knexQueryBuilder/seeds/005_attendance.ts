import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(DbConstants.ATTENDANCE_TABLE).del();

  let attendance = [];

  // Seed 20 students
  const start = 10;
  const end = 20;

  let LRN: string = '';
  let attendance_id = 1;

  for (let count = start; count <= end; count++) {
    LRN = `1234567891${count}`;

    attendance.push({
      attendance_id,
      subject_id: 'MMW1',
      LRN: '123456789120',
      attendance_stat: 'present',
    });

    attendance_id++;
  }

  // Inserts seed entries
  await knex(DbConstants.ATTENDANCE_TABLE).insert(attendance);
}
