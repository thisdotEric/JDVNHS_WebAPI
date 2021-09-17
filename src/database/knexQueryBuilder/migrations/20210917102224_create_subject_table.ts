import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(DbConstants.SUBJECT_TABLE, table => {
        table.string('subject_id').notNullable().primary().unique();
        table.string('subject_name').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(DbConstants.SUBJECT_TABLE);
}
