import { Knex } from 'knex'

export async function seed(knex: Knex) {
  await knex('subjects').insert([
    { description: "Arte" },
    { description: "Biologia" },
    { description: "Educação Física" },
    { description: "Espanhol" },
    { description: "Filosofia" },
    { description: "Física" },
    { description: "Geografia" },
    { description: "História" },
    { description: "Inglês" },
    { description: "Língua Portuguesa" },
    { description: "Matemática" },
    { description: "Mídias" },
    { description: "Química" },
    { description: "Sociologia" }
  ])
}