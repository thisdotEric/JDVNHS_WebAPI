import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(DbConstants.TEACHER_TABLE).del();

    // Inserts seed entries
    await knex(DbConstants.TEACHER_TABLE).insert([
        {
            teacher_id: '18-14908',
            first_name: 'John Eric',
            middle_name: 'Mendoza',
            last_name: 'Siguenza',
            contact_number: '09191029837',
            gender: 'male',
            email_address: 'johneric.siguenza@unc.edu.ph',
        },
    ]);
}
