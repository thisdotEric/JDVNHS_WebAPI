import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(DbConstants.ATTENDANCE_TABLE, table => {
    table.string('LRN').nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(DbConstants.ATTENDANCE_TABLE, table => {
    table.string('LRN').notNullable().alter();
  });
}
