import * as Knex from 'knex';
import { ReferenceOptions } from '../../../constant/db.constants';
import { LEARNING_MATERIAL } from '../../../constant/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(LEARNING_MATERIAL, table => {
    table.text('link').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(LEARNING_MATERIAL, table => {
    table.dropColumn('link');
  });
}
