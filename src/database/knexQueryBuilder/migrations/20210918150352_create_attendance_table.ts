import * as Knex from 'knex';
import { ATTENDANCE, LECTURES, STUDENT } from 'src/constant/tables';
import { ReferenceOptions } from '../../../constant/db.constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(ATTENDANCE, table => {
    table.integer('lecture_id').notNullable();
    table.string('LRN').notNullable();
    table.enum('status', ['present', 'absent', 'excused']).defaultTo('present');

    table
      .foreign('lecture_id')
      .references('lecture_id')
      .inTable(LECTURES)
      .onDelete(ReferenceOptions.CASCADE);

    table
      .foreign('LRN')
      .references('LRN')
      .inTable(STUDENT)
      .onDelete(ReferenceOptions.CASCADE);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(ATTENDANCE);
}
