import * as Knex from 'knex';
import { ReferenceOptions } from '../../../constant/db.constants';
import { StudentConstants } from '../../../constant/constants';
import { STUDENT, STUDENT_SUBJECTS, SUBJECT } from 'src/constant/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(STUDENT_SUBJECTS, table => {
    table.string('LRN', StudentConstants.LRN_LENGTH).notNullable();
    table.string('subject_id').notNullable();
    table
      .foreign('LRN')
      .references('LRN')
      .inTable(STUDENT)
      .onDelete(ReferenceOptions.CASCADE);
    table
      .foreign('subject_id')
      .references('subject_id')
      .inTable(SUBJECT)
      .onDelete(ReferenceOptions.CASCADE);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(STUDENT_SUBJECTS);
}
