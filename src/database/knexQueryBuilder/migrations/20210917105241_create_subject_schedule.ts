import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(DbConstants.SCHEDULE_TABLE, table => {
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
            .inTable(DbConstants.SUBJECT_TABLE);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(DbConstants.SCHEDULE_TABLE);
}
