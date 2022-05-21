import * as Knex from 'knex';
import { ReferenceOptions } from '../../../constant/db.constants';
import { ASSESSMENT, LEARNING_COMPETENCY } from '../../../constant/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(ASSESSMENT, table => {
    table.string('code').nullable();

    table
      .foreign('code')
      .references('code')
      .inTable(LEARNING_COMPETENCY)
      .onDelete(ReferenceOptions.CASCADE);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(ASSESSMENT, table => {
    table.dropColumn('code');
  });
}
