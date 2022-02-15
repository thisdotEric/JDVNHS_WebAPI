import * as Knex from 'knex';
import { ATTENDANCE } from 'src/constant/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(ATTENDANCE, table => {
    table.string('LRN').nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(ATTENDANCE, table => {
    table.string('LRN').notNullable().alter();
  });
}
