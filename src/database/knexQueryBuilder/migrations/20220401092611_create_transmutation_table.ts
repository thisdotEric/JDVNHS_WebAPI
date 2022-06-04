import * as Knex from 'knex';
import { TRANSMUTATION } from '../../../constant/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TRANSMUTATION, table => {
    table.float('initial_grade_high').notNullable().unsigned();
    table.float('initial_grade_low').notNullable().unsigned();
    table.float('transmutated_grade').notNullable().unsigned();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TRANSMUTATION);
}
