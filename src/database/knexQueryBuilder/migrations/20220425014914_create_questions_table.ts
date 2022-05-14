import * as Knex from 'knex';
import { ReferenceOptions } from '../../../constant/db.constants';
import { LEARNING_COMPETENCY, QUESTIONS } from '../../../constant/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(QUESTIONS, table => {
    table
      .increments('question_id')
      .notNullable()
      .primary()
      .unique()
      .defaultTo(0);
    table.json('question').notNullable();
    table.string('code').notNullable(); // Learning competency id
    table
      .enum('question_type', ['Introductory', 'Enabling', 'Demonstrative'])
      .defaultTo('Introductory');

    table
      .foreign('code')
      .references('code')
      .inTable(LEARNING_COMPETENCY)
      .onDelete(ReferenceOptions.CASCADE);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(QUESTIONS);
}
