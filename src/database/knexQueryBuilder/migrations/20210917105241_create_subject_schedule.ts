import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(DbConstants.SCHEDULE_TABLE, table => {
        table.string('schedule_id').notNullable().primary().unique();
        table.string('day').notNullable();
        table.string('start_time').notNullable().defaultTo('08:00');
        table.string('end_time').notNullable().defaultTo('08:00');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(DbConstants.SCHEDULE_TABLE);
}
