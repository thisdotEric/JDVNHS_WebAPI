import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';
import faker from '../../../utils/faker';
import PasswordUtil from '../../../algorithms/password/password';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(DbConstants.TEACHER_TABLE).del();

    const teacherData: any[] = [];
    const teacherAdditionalData: any[] = [];
    const teacherPasswordData: any[] = [];

    // Seed 5 teacher data
    const start = 10;
    const end = 15;

    let user_id: string = '';

    for (let count = start; count <= end; count++) {
        user_id = `11111${count}`;

        teacherData.push({
            user_id,
            first_name: faker.name.firstName(),
            middle_name: faker.name.lastName(),
            last_name: faker.name.lastName(),
            gender: count % 3 == 0 ? 'male' : 'female',
            contact_number: `0987624${count}31`,
            role: 'teacher',
        });

        teacherAdditionalData.push({
            teacher_id: user_id,
            email_address: faker.internet.email().toLowerCase(),
        });

        const hashedPassword = await PasswordUtil.hashPassword(user_id);
        teacherPasswordData.push({
            user_id,
            password: hashedPassword.hashedPassword,
            salt: hashedPassword.salt,
        });
    }

    // Inserts seed entries
    await knex(DbConstants.USERS_TABLE).insert(teacherData);
    await knex(DbConstants.TEACHER_TABLE).insert(teacherAdditionalData);
    await knex(DbConstants.PASSWORD_TABLE).insert(teacherPasswordData);
}
