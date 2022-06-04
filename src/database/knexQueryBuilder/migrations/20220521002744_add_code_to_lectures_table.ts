import * as Knex from 'knex';
import { ReferenceOptions } from '../../../constant/db.constants';
import { LEARNING_COMPETENCY, LECTURES } from '../../../constant/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(LECTURES, table => {
    table.string('code').notNullable().defaultTo('M7NS-Ie-1');

    table
      .foreign('code')
      .references('code')
      .inTable(LEARNING_COMPETENCY)
      .onDelete(ReferenceOptions.CASCADE);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(LECTURES, table => {
    table.dropColumn('code');
  });
}
