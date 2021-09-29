import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';
import faker from '../../../utils/faker';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(DbConstants.TEACHER_TABLE).del();

    const teacherData: any[] = [];
    const teacherAdditionalData: any[] = [];

    for (let count = 10; count < 20; count++) {
        const teacher = {
            user_id: `11111${count}`,
            first_name: faker.name.firstName(),
            middle_name: faker.name.lastName(),
            last_name: faker.name.lastName(),
            gender: count % 3 == 0 ? 'male' : 'female',
            contact_number: `0987624${count}31`,
            role: 'teacher',
            password: 'teacher',
        };

        teacherData.push(teacher);

        const additionalData = {
            teacher_id: `11111${count}`,
            email_address: faker.internet.email().toLowerCase(),
        };

        teacherAdditionalData.push(additionalData);
    }

    // Inserts seed entries
    await knex(DbConstants.USERS_TABLE).insert(teacherData);
    await knex(DbConstants.TEACHER_TABLE).insert(teacherAdditionalData);
}
