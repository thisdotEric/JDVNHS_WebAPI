import * as Knex from 'knex';
import { SUBJECT, TEACHER, TEACHER_SUBJECTS } from 'src/constant/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TEACHER_SUBJECTS, table => {
    table.string('teacher_id').notNullable();
    table.string('subject_id').notNullable();
    table.foreign('teacher_id').references('teacher_id').inTable(TEACHER);
    table.foreign('subject_id').references('subject_id').inTable(SUBJECT);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TEACHER);
}
