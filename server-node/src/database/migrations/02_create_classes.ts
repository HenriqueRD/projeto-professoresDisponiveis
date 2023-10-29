import { Knex } from 'knex'

export async function up(knex : Knex) {
  return knex.schema.createTable('classes', x => {
    x.increments('id').primary()
    x.string('price').notNullable()

    x.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
    x.integer('subject_id').notNullable().references('id').inTable('subjects')
  })
}

export async function down(knex : Knex) {
  return knex.schema.dropTable('classes')
}