import { Knex } from 'knex'

export async function up(knex : Knex) {
  return knex.schema.createTable('users', x => {
    x.increments('id').primary()
    x.string('name').notNullable()
    x.string('icon_url').notNullable()
    x.string('phone').notNullable()
    x.string('description').notNullable()
  })
}

export async function down(knex : Knex) {
  return knex.schema.dropTable('users')
}