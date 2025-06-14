import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { name, prontuario, enfermaria } = req.query;
    let query = 'SELECT id, nome, prontuario, enfermaria, nivel_assistencia, peso, altura, imc, dieta, created_at, updated_at FROM patients WHERE 1=1';
    const params = [];
    if (name) {
      params.push(`%${name}%`);
      query += ` AND nome ILIKE $${params.length}`;
    }
    if (prontuario) {
      params.push(prontuario);
      query += ` AND prontuario = $${params.length}`;
    }
    if (enfermaria) {
      params.push(enfermaria);
      query += ` AND enfermaria = $${params.length}`;
    }
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { nome, prontuario, enfermaria, nivel_assistencia, peso, altura, dieta } = req.body;
    if (!nome || !prontuario || !enfermaria || !nivel_assistencia || !peso || !altura || !dieta) {
      return res.status(400).json({ error: 'All fields required' });
    }
    const { rows } = await pool.query(
      'INSERT INTO patients (nome, prontuario, enfermaria, nivel_assistencia, peso, altura, dieta) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [nome, prontuario, enfermaria, nivel_assistencia, peso, altura, dieta]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nome, prontuario, enfermaria, nivel_assistencia, peso, altura, dieta } = req.body;
    const { rows } = await pool.query(
      'UPDATE patients SET nome = $1, prontuario = $2, enfermaria = $3, nivel_assistencia = $4, peso = $5, altura = $6, dieta = $7 WHERE id = $8 RETURNING *',
      [nome, prontuario, enfermaria, nivel_assistencia, peso, altura, dieta, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM patients WHERE id = $1 RETURNING id', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;