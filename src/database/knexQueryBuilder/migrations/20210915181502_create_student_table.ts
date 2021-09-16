import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('student', table => {
        table.string('LRN', 12).notNullable().unique().primary();
        table.string('first_name').notNullable();
        table.string('middle_name').notNullable();
        table.string('last_name').notNullable();
        table.enum('gender', ['male', 'female']).defaultTo('male');
        table.string('contact_number', 11).notNullable();
        table.date('birth_date').notNullable();
        table.string('address');
        table.enum('grade_level', [7, 8, 9, 10]).defaultTo(10);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('student');
}
