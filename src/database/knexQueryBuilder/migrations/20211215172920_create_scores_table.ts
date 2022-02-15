import * as Knex from 'knex';
import { ASSESSMENT, SCORES } from 'src/constant/tables';
import { ReferenceOptions } from '../../../constant/db.constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(SCORES, table => {
    table.increments('score_id').primary().notNullable().unique().defaultTo(0);
    table.integer('assessment_id').notNullable();
    table.enum('grading_period', [1, 2, 3, 4]).defaultTo(1);
    table.string('LRN').notNullable();
    table.integer('score').notNullable().unsigned();

    table
      .foreign('assessment_id')
      .references('assessment_id')
      .inTable(ASSESSMENT)
      .onDelete(ReferenceOptions.CASCADE);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(SCORES);
}
