import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(DbConstants.USERS_TABLE, table => {
        table.string('user_id').notNullable().primary().unique();
        table.string('first_name').notNullable();
        table.string('middle_name').notNullable();
        table.string('last_name').notNullable();
        table.enum('gender', ['male', 'female']).defaultTo('male');
        table.string('contact_number').notNullable();
        table.enum('role', ['student', 'teacher']).defaultTo('student');
        table.string('password').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(DbConstants.USERS_TABLE);
}
