import * as Knex from 'knex';
import { DbConstants, ReferenceOptions } from '../../../constant/db.constants';
import { SCHEDULE, SUBJECT } from '../../../constant/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(SCHEDULE, table => {
    table.string('subject_id').notNullable();
    table
      .enum('meeting_day', [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ])
      .defaultTo('Monday');
    table.string('start_time').notNullable().defaultTo('08:00');
    table.string('end_time').notNullable().defaultTo('08:00');

    table
      .foreign('subject_id')
      .references('subject_id')
      .inTable(SUBJECT)
      .onDelete(ReferenceOptions.CASCADE);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(SCHEDULE);
}
