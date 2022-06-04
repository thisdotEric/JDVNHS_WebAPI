import * as Knex from 'knex';
import { DbConstants, ReferenceOptions } from '../../../constant/db.constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(DbConstants.LECTURE_TABLE, table => {
    table
      .increments('lecture_id')
      .primary()
      .notNullable()
      .unique()
      .defaultTo(0);
    table.date('lecture_date').notNullable();
    table.string('subject_id').notNullable();
    table.enum('grading_period', [1, 2, 3, 4]).defaultTo(1);

    table
      .foreign('subject_id')
      .references('subject_id')
      .inTable(DbConstants.SUBJECT_TABLE)
      .onDelete(ReferenceOptions.CASCADE);
  });
  // .createTable(DbConstants.LESSONS_TABLE, table => {
  //   table.string('lesson_name').notNullable();
  //   table.string('lesson_description');
  //   table.string('subject_id').notNullable();
  //   table.integer('lecture_id').notNullable().unsigned();

  //   table
  //     .foreign('lecture_id')
  //     .references('lecture_id')
  //     .inTable(DbConstants.LECTURE_TABLE)
  //     .onDelete(ReferenceOptions.CASCADE);
  // });
}

export async function down(knex: Knex): Promise<void> {
  return (
    knex.schema
      // .dropTableIfExists(DbConstants.LESSONS_TABLE)
      .dropTableIfExists(DbConstants.LECTURE_TABLE)
  );
}
