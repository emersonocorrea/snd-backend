import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { patient_id } = req.query;
    let query = 'SELECT id, patient_id, type, description, created_at FROM meals WHERE 1=1';
    const params = [];
    if (patient_id) {
      params.push(patient_id);
      query += ` AND patient_id = $${params.length}`;
    }
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { patient_id, type, description } = req.body;
    if (!patient_id || !type || !description) {
      return res.status(400).json({ error: 'All fields required' });
    }
    const { rows } = await pool.query(
      'INSERT INTO meals (patient_id, type, description) VALUES ($1, $2, $3) RETURNING *',
      [patient_id, type, description]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { patient_id, type, description } = req.body;
    const { rows } = await pool.query(
      'UPDATE meals SET patient_id = $1, type = $2, description = $3 WHERE id = $4 RETURNING *',
      [patient_id, type, description, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM meals WHERE id = $1 RETURNING id', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;