import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constant';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(DbConstants.STUDENT_TABLE).del();

    // Inserts seed entries
    await knex(DbConstants.STUDENT_TABLE).insert([
        {
            LRN: '123456789123',
            first_name: 'John Eric',
            middle_name: 'Mendoza',
            last_name: 'Siguenza',
            gender: 'male',
            contact_number: '09876152431',
            birth_date: '1999-04-15',
            address: 'Calabanga',
            grade_level: 10,
        },
        {
            LRN: '999456789123',
            first_name: 'Michael',
            middle_name: 'Martin',
            last_name: 'Modric',
            gender: 'male',
            contact_number: '09876151298',
            birth_date: new Date(),
            address: 'Naga City',
            grade_level: 8,
        },
        {
            LRN: '999984789123',
            first_name: 'Barbie',
            middle_name: 'Martin',
            last_name: 'Benzema',
            gender: 'female',
            contact_number: '09876151298',
            birth_date: new Date(),
            address: 'Camarines Sur',
            grade_level: 8,
        },
    ]);
}
