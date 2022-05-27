import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  // await knex(DbConstants.SCHEDULE_TABLE).del();
  // Inserts seed entries
  // await knex(DbConstants.SCHEDULE_TABLE).insert([
  //   {
  //     subject_id: 'MMW1',
  //     meeting_day: 'Wednesday',
  //     start_time: '10:00',
  //     end_time: '13:00',
  //     schedule_date: '2021-09-30',
  //   },
  //   {
  //     subject_id: 'MMW1',
  //     meeting_day: 'Monday',
  //     start_time: '10:00',
  //     end_time: '11:00',
  //     schedule_date: '2021-09-10',
  //   },
  // ]);
}
