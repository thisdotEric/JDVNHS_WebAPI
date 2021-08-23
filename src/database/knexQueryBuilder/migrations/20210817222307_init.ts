import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('test_tbl', table => {
        table.increments('id').notNullable();
        table.string('name');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('test_tbl');
}
