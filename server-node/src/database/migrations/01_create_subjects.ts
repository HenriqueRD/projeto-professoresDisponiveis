import { Knex } from 'knex'

export async function up(knex : Knex) {
  return knex.schema.createTable('subjects', x => {
    x.increments('id').primary();
    x.string('description').notNullable();
  })
}

export async function down(knex : Knex) {
  return knex.schema.dropTable('subjects')
}