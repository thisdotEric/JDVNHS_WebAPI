import * as Knex from 'knex';
import { DbConstants, ReferenceOptions } from '../../../constant/db.constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(DbConstants.ATTENDANCE_TABLE, table => {
    table.integer('lecture_id').notNullable();
    table.string('LRN').notNullable();
    table.enum('status', ['present', 'absent', 'excused']).defaultTo('present');

    table
      .foreign('lecture_id')
      .references('lecture_id')
      .inTable(DbConstants.LECTURE_TABLE)
      .onDelete(ReferenceOptions.CASCADE);

    table
      .foreign('LRN')
      .references('LRN')
      .inTable(DbConstants.STUDENT_TABLE)
      .onDelete(ReferenceOptions.CASCADE);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(DbConstants.ATTENDANCE_TABLE);
}
