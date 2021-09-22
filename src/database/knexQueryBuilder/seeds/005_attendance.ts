import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(DbConstants.ATTENDANCE_TABLE).del();

    // Inserts seed entries
    await knex(DbConstants.ATTENDANCE_TABLE).insert([
        {
            attendance_id: 1,
            subject_id: 'MMW1',
            LRN: '123456789123',
            attendance_stat: 'present',
        },
    ]);
}
