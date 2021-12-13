import * as Knex from 'knex';
import { DbConstants, ReferenceOptions } from '../../../constant/db.constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(DbConstants.PASSWORD_TABLE, table => {
    table.string('user_id').notNullable().unique();
    table.text('password').notNullable();
    table.text('salt').notNullable();

    table
      .foreign('user_id')
      .references('user_id')
      .inTable(DbConstants.USERS_TABLE)
      .onDelete(ReferenceOptions.CASCADE);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(DbConstants.PASSWORD_TABLE);
}
