import * as Knex from 'knex';
import { ReferenceOptions } from '../../../constant/db.constants';
import { StudentConstants } from '../../../constant/constants';
import { STUDENT, USERS } from '../../../constant/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(STUDENT, table => {
    table
      .string('LRN', StudentConstants.LRN_LENGTH)
      .notNullable()
      .unique()
      .primary();
    table.date('birth_date').notNullable();
    table.string('address');
    table.enum('grade_level', [7, 8, 9, 10]).defaultTo(10);

    table
      .foreign('LRN')
      .references('user_id')
      .inTable(USERS)
      .onDelete(ReferenceOptions.CASCADE);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(STUDENT);
}
