import bcrypt from 'bcryptjs';

export const seed = async (knex) => {
  await knex('users').del();
  await knex('users').insert([
    {
      name: 'Admin',
      email: 'admin@hospital.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
      status: 'active'
    }
  ]);
};