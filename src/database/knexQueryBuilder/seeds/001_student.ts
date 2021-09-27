import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(DbConstants.STUDENT_TABLE).del();
    await knex(DbConstants.USERS_TABLE).del();

    // Inserts seed entries
    await knex(DbConstants.USERS_TABLE).insert([
        {
            user_id: '123456789123',
            first_name: 'John Eric',
            middle_name: 'Mendoza',
            last_name: 'Siguenza',
            gender: 'male',
            contact_number: '09876152431',
            role: 'student',
            password: 'johneric',
        },
        {
            user_id: '123456789124',
            first_name: 'John Eric',
            middle_name: 'Mendoza',
            last_name: 'Siguenza',
            gender: 'male',
            contact_number: '09876152431',
            role: 'student',
            password: 'johneric',
        },
        {
            user_id: '1111111',
            first_name: 'Ming',
            middle_name: 'Mendoza',
            last_name: 'Ming',
            gender: 'male',
            contact_number: '09876152431',
            role: 'teacher',
            password: 'mingming',
        },
    ]);

    await knex(DbConstants.STUDENT_TABLE).insert([
        {
            LRN: '123456789123',
            birth_date: new Date(),
            address: 'Calabanga',
            grade_level: 10,
        },
    ]);
}
