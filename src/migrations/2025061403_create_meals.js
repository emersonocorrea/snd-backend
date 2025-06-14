export const up = async (knex) => {
  await knex.schema.createTable('meals', (table) => {
    table.increments('id').primary();
    table.integer('patient_id').unsigned().references('id').inTable('patients').onDelete('CASCADE');
    table.enum('type', ['Desjejum', 'Almoço', 'Lanche', 'Jantar', 'Ceia']).notNullable();
    table.text('description').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('meals');
};