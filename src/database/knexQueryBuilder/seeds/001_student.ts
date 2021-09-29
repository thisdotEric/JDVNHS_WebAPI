import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';
import faker from '../../../utils/faker';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(DbConstants.STUDENT_TABLE).del();
    await knex(DbConstants.USERS_TABLE).del();

    const userSeedData: any[] = [];
    const studentAddtionalData: any[] = [];

    for (let count = 10; count < 60; count++) {
        const user = {
            user_id: `1234567891${count}`,
            first_name: faker.name.firstName(),
            middle_name: faker.name.lastName(),
            last_name: faker.name.lastName(),
            gender: count % 3 == 0 ? 'male' : 'female',
            contact_number: `09876${count}2431`,
            role: 'student',
            password: 'student',
        };

        userSeedData.push(user);

        const additionalData = {
            LRN: `1234567891${count}`,
            birth_date: faker.date.between('1999-01-01', '2005-12-25'),
            address: faker.address.city(),
            grade_level: 10,
        };

        studentAddtionalData.push(additionalData);
    }

    // Inserts seed entries
    await knex(DbConstants.USERS_TABLE).insert(userSeedData);
    await knex(DbConstants.STUDENT_TABLE).insert(studentAddtionalData);
}
