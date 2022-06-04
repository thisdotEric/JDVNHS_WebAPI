import * as Knex from 'knex';
import { ReferenceOptions } from '../../../constant/db.constants';
import {
  LEARNING_COMPETENCY,
  LEARNING_MATERIAL,
  SUBJECT,
} from '../../../constant/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(LEARNING_COMPETENCY, table => {
      table.string('code').notNullable().primary().unique();
      table.string('learning_competency').notNullable();
      table.enum('grade_level', [7, 8, 9, 10]).notNullable().defaultTo(7);
      table.enum('grading_period', [1, 2, 3, 4]).notNullable().defaultTo(1);
      table.string('subject_id').notNullable().defaultTo('Math7');

      table
        .foreign('subject_id')
        .references('subject_id')
        .inTable(SUBJECT)
        .onDelete(ReferenceOptions.CASCADE);
    })
    .createTable(LEARNING_MATERIAL, table => {
      table.string('code').notNullable();
      table.string('learning_material').notNullable();

      table
        .foreign('code')
        .references('code')
        .inTable(LEARNING_COMPETENCY)
        .onDelete(ReferenceOptions.CASCADE);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropSchemaIfExists(LEARNING_MATERIAL)
    .dropSchemaIfExists(LEARNING_COMPETENCY);
}
