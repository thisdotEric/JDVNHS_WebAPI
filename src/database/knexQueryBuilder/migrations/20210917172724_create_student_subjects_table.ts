import * as Knex from 'knex';
import { DbConstants, ReferenceOptions } from '../../../constant/db.constants';
import { StudentConstants } from '../../../constant/constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(DbConstants.STUDENT_SUBJECTS, table => {
    table.string('LRN', StudentConstants.LRN_LENGTH).notNullable();
    table.string('subject_id').notNullable();
    table
      .foreign('LRN')
      .references('LRN')
      .inTable(DbConstants.STUDENT_TABLE)
      .onDelete(ReferenceOptions.CASCADE);
    table
      .foreign('subject_id')
      .references('subject_id')
      .inTable(DbConstants.SUBJECT_TABLE)
      .onDelete(ReferenceOptions.CASCADE);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(DbConstants.STUDENT_SUBJECTS);
}
