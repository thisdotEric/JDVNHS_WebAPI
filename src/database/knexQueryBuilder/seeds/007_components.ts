import * as Knex from 'knex';
import { COMPONENTS } from '../../../constant/tables';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(COMPONENTS).del();

  // Inserts seed entries
  await knex(COMPONENTS).insert([
    {
      subject_id: 'PreCal',
      written_work: 0.3,
      performance_task: 0.5,
      quarterly_assessment: 0.2,
    },
  ]);
}
