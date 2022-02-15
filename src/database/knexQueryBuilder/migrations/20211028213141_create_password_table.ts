import * as Knex from 'knex';
import { PASSWORD, USERS } from 'src/constant/tables';
import { ReferenceOptions } from '../../../constant/db.constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(PASSWORD, table => {
    table.string('user_id').notNullable().unique();
    table.text('password').notNullable();
    table.text('salt').notNullable();

    table
      .foreign('user_id')
      .references('user_id')
      .inTable(USERS)
      .onDelete(ReferenceOptions.CASCADE);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(PASSWORD);
}
