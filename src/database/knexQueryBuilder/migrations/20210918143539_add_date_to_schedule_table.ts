import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function up(knex: Knex): Promise<void> {
  // return knex.schema.table(DbConstants.SCHEDULE_TABLE, table => {
  //   table.date('schedule_date').notNullable().defaultTo('2021-09-19');
  // });
}

export async function down(knex: Knex): Promise<void> {
  // return knex.schema.table(DbConstants.SCHEDULE_TABLE, table => {
  //   table.dropColumn('schedule_date');
  // });
}
