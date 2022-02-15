import * as Knex from 'knex';
import { SCHEDULE } from 'src/constant/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(SCHEDULE, table => {
    table.date('schedule_date').notNullable().defaultTo('2021-09-19');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(SCHEDULE, table => {
    table.dropColumn('schedule_date');
  });
}
