import * as Knex from 'knex';
import { ReferenceOptions } from '../../../constant/db.constants';
import { ASSESSMENT, LECTURES } from '../../../constant/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(ASSESSMENT, table => {
    table.integer('lecture_id').nullable();

    table
      .foreign('lecture_id')
      .references('lecture_id')
      .inTable(LECTURES)
      .onDelete(ReferenceOptions.CASCADE);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(ASSESSMENT, table => {
    table.dropColumn('lecture_id');
  });
}
