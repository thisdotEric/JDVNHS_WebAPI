import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(DbConstants.TEACHER_TABLE).del();

    // Inserts seed entries
    await knex(DbConstants.TEACHER_TABLE).insert([
        {
            teacher_id: '1111111',
            email_address: 'johneric.siguenza@unc.edu.ph',
        },
    ]);
}
