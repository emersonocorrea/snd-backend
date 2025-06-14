export const up = async (knex) => {
  await knex.schema.createTable('patients', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('prontuario').unique().notNullable();
    table.string('enfermaria').notNullable();
    table.enum('nivelAssistencia', ['Nível I (Primário)', 'Nível II (Secundário)', 'Nível III (Terciário)']).notNullable();
    table.float('peso').notNullable();
    table.float('altura').notNullable();
    table.float('imc').notNullable();
    table.string('dieta').notNullable();
    table.text('observacoes');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('patients');
};