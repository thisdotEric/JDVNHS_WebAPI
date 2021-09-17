import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(DbConstants.SUBJECT_TABLE).del();

    // Inserts seed entries
    await knex(DbConstants.SUBJECT_TABLE).insert([
        { subject_id: 'MMW1', subject_name: 'Mathematics in the Modern World' },
    ]);
}
