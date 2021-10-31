import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(DbConstants.TEACHER_SUBJECTS, table => {
        table.string('teacher_id').notNullable();
        table.string('subject_id').notNullable();
        table
            .foreign('teacher_id')
            .references('teacher_id')
            .inTable(DbConstants.TEACHER_TABLE);
        table
            .foreign('subject_id')
            .references('subject_id')
            .inTable(DbConstants.SUBJECT_TABLE);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(DbConstants.TEACHER_SUBJECTS);
}
