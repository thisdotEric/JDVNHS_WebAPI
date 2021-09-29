import * as Knex from 'knex';
import { DbConstants, ReferenceOptions } from '../../../constant/db.constants';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(DbConstants.ATTENDANCE_TABLE, table => {
        table.increments('attendance_id').notNullable().primary().defaultTo(0);
        table.string('subject_id').notNullable();
        table.string('LRN').notNullable();
        table
            .enum('attendance_stat', ['present', 'absent', 'excused'])
            .notNullable()
            .defaultTo('present');

        table
            .foreign('subject_id')
            .references('subject_id')
            .inTable(DbConstants.SUBJECT_TABLE)
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
