import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';
import faker from '../../../utils/faker';
import PasswordUtil from '../../../algorithms/password/password';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(DbConstants.STUDENT_TABLE).del();
    await knex(DbConstants.USERS_TABLE).del();

    const userSeedData: any[] = [];
    const studentAddtionalData: any[] = [];
    const userPasswordData: any[] = [];

    // Seed 20 students
    const start = 10;
    const end = 20;

    let LRN: string = '';

    for (let count = start; count <= end; count++) {
        LRN = `1234567891${count}`;

        userSeedData.push({
            user_id: LRN,
            first_name: faker.name.firstName(),
            middle_name: faker.name.lastName(),
            last_name: faker.name.lastName(),
            gender: count % 3 == 0 ? 'male' : 'female',
            contact_number: `09876${count}2431`,
            role: 'student',
        });

        studentAddtionalData.push({
            LRN,
            birth_date: faker.date.between('1999-01-01', '2005-12-25'),
            address: faker.address.city(),
            grade_level: 10,
        });

        const hashedPassword = await PasswordUtil.hashPassword(LRN);

        userPasswordData.push({
            user_id: LRN,
            password: hashedPassword.hashedPassword,
            salt: hashedPassword.salt,
        });
    }

    // Inserts seed entries
    await knex(DbConstants.USERS_TABLE).insert(userSeedData);
    await knex(DbConstants.STUDENT_TABLE).insert(studentAddtionalData);
    await knex(DbConstants.PASSWORD_TABLE).insert(userPasswordData);
}
