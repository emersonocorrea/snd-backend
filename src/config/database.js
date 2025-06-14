import knex from 'knex';
import knexfile from '../knexfile.js';

// Conexão com PostgreSQL usando Knex
const db = knex(knexfile);

export default db;