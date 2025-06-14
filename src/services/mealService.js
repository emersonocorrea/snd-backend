import db from '../config/database.js';

export const getMealsByType = async (type) => {
  return db('meals')
    .join('patients', 'meals.patient_id', 'patients.id')
    .where({ 'meals.type': type })
    .select(
      'meals.id',
      'meals.type',
      'meals.description',
      'patients.id as patient_id',
      'patients.nome',
      'patients.prontuario',
      'patients.enfermaria',
      'patients.dieta'
    );
};