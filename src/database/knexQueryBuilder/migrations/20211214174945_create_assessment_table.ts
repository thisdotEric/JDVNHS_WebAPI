import * as Knex from 'knex';
import { DbConstants, ReferenceOptions } from '../../../constant/db.constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(DbConstants.ASSESSMENT_TABLE, table => {
    table
      .increments('assessment_id')
      .primary()
      .notNullable()
      .unique()
      .defaultTo(0);
    table.date('date').notNullable();
    table.string('subject_id').notNullable();
    table.integer('items').notNullable().unsigned();
    table.enum('component', ['WW', 'PT', 'QA']).notNullable().defaultTo('WW');

    table
      .foreign('subject_id')
      .references('subject_id')
      .inTable(DbConstants.SUBJECT_TABLE)
      .onDelete(ReferenceOptions.CASCADE);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(DbConstants.ASSESSMENT_TABLE);
}
