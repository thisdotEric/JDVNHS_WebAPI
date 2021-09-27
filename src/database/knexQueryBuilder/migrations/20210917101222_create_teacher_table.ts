import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(DbConstants.TEACHER_TABLE, table => {
        table.string('teacher_id').notNullable().primary().unique();
        table.string('email_address').nullable();

        table
            .foreign('teacher_id')
            .references('user_id')
            .inTable(DbConstants.USERS_TABLE);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(DbConstants.TEACHER_TABLE);
}
