import * as Knex from 'knex';
import { ReferenceOptions } from '../../../constant/db.constants';
import { TEACHER, USERS } from '../../../constant/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TEACHER, table => {
    table.string('teacher_id').notNullable().primary().unique();
    table.string('email_address').nullable();

    table
      .foreign('teacher_id')
      .references('user_id')
      .inTable(USERS)
      .onDelete(ReferenceOptions.CASCADE);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TEACHER);
}
