import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT id, name, email, role, status FROM users');
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, password, role, status } = req.body;
    if (!name || !email || !password || !role || !status) {
      return res.status(400).json({ error: 'All fields required' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password, role, status) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role, status',
      [name, email, hashedPassword, role, status]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password, role, status } = req.body;
    let query = 'UPDATE users SET name = $1, email = $2, role = $3, status = $4';
    const params = [name, email, role, status];
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ', password = $5';
      params.push(hashedPassword);
    }
    query += ' WHERE id = $' + (params.length + 1) + ' RETURNING id, name, email, role, status';
    params.push(id);
    const { rows } = await pool.query(query, params);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;