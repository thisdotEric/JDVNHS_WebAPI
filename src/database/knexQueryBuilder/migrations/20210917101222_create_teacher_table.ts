import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(DbConstants.TEACHER_TABLE, table => {
        table.string('teacher_id').notNullable().primary();
        table.string('first_name').notNullable();
        table.string('middle_name').notNullable();
        table.string('last_name').notNullable();
        table.string('contact_number', 11).notNullable();
        table
            .enum('gender', ['male', 'female'])
            .notNullable()
            .defaultTo('female');
        table.string('email_address');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(DbConstants.TEACHER_TABLE);
}
