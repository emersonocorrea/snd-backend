import bcrypt from 'bcryptjs';
import db from '../config/database.js';

export const createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const [user] = await db('users').insert({
    ...data,
    password: hashedPassword
  }).returning(['id', 'name', 'email', 'role', 'status', 'created_at', 'updated_at']);
  return user;
};

export const getUsers = async () => {
  return db('users').select('id', 'name', 'email', 'role', 'status', 'created_at', 'updated_at');
};

export const getUserById = async (id) => {
  const user = await db('users')
    .where({ id })
    .select('id', 'name', 'email', 'role', 'status', 'created_at', 'updated_at')
    .first();
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const updateUser = async (id, data) => {
  const updateData = { ...data };
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }
  const [user] = await db('users')
    .where({ id })
    .update(updateData)
    .returning(['id', 'name', 'email', 'role', 'status', 'created_at', 'updated_at']);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const deleteUser = async (id) => {
  const deleted = await db('users').where({ id }).del();
  if (!deleted) {
    throw new Error('User not found');
  }
};