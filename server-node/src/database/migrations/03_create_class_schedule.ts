import { Knex } from 'knex'

export async function up(knex : Knex) {
  return knex.schema.createTable('class_schedule', x => {
    x.increments('id').primary()
    x.integer('week_day').notNullable()
    x.integer('from').notNullable()
    x.integer('to').notNullable()

    x.integer('class_id').notNullable().references('id').inTable('classses').onDelete('CASCADE').onUpdate('CASCADE')
  })
}

export async function down(knex : Knex) {
  return knex.schema.dropTable('class_schedule')
}