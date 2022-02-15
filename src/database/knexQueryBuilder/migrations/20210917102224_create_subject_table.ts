import * as Knex from 'knex';
import { SUBJECT } from '../../../constant/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(SUBJECT, table => {
    table.string('subject_id').notNullable().primary().unique();
    table.string('subject_name').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(SUBJECT);
}
