import * as Knex from 'knex';
import { TRAINING_DATA } from '../../../constant/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TRAINING_DATA, table => {
    table.increments('id').notNullable().primary().defaultTo(0);
    table.enum('gender', ['male', 'female']).defaultTo('male').nullable();
    table.boolean('passedPreTest').notNullable().defaultTo(true);
    table.integer('pt_wScore').unsigned().defaultTo(0);
    table.integer('qa_wScore').unsigned().defaultTo(0);
    table.integer('ww_wScore').unsigned().defaultTo(0);
    table.enum('grading_period', [1, 2, 3, 4]).notNullable().defaultTo(1);
    table.string('subject_id').defaultTo('Math10').notNullable();
    table.boolean('conduct_intervention').defaultTo(false).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TRAINING_DATA);
}
