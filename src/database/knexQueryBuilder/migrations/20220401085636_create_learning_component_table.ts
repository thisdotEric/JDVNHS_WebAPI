import * as Knex from 'knex';
import { ReferenceOptions } from '../../../constant/db.constants';
import { COMPONENTS, SUBJECT } from '../../../constant/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(COMPONENTS, table => {
    table.string('subject_id').notNullable().unique();
    table.float('written_work').notNullable().unsigned();
    table.float('quarterly_assessment').notNullable().unsigned();
    table.float('performance_task').notNullable().unsigned();

    table
      .foreign('subject_id')
      .references('subject_id')
      .inTable(SUBJECT)
      .onDelete(ReferenceOptions.CASCADE);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(COMPONENTS);
}
