import * as Knex from 'knex';
import { ReferenceOptions } from '../../../constant/db.constants';
import { ASSESSMENT } from '../../../constant/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(ASSESSMENT, table => {
    table
      .enu('assessment_type', ['summative', 'formative'])
      .notNullable()
      .defaultTo('summative');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(ASSESSMENT, table => {
    table.dropColumn('assessment_type');
  });
}
