import * as Knex from 'knex';
import { ASSESSMENT } from '../../../constant/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(ASSESSMENT, table => {
    table
      .enum('grading_period', [1, 2, 3, 4])
      .notNullable()
      .unsigned()
      .defaultTo(1);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(ASSESSMENT, table => {
    table.dropColumn('grading_period');
  });
}
