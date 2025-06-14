import db from '../config/database.js';

export const createPatient = async (data) => {
  const imc = data.peso / (data.altura * data.altura);
  const { meals, ...patientData } = data;

  const [patient] = await db('patients').insert({
    ...patientData,
    imc
  }).returning('*');

  if (meals && meals.length) {
    await db('meals').insert(
      meals.map(meal => ({
        patient_id: patient.id,
        type: meal.type,
        description: meal.description
      }))
    );
  }

  return {
    ...patient,
    meals: meals || []
  };
};

export const getPatients = async (filter) => {
  let query = db('patients').select('*');
  if (filter) {
    query = query.where(function () {
      this.where('nome', 'ilike', `%${filter}%`)
        .orWhere('prontuario', 'ilike', `%${filter}%`)
        .orWhere('enfermaria', 'ilike', `%${filter}%`);
    });
  }
  const patients = await query;
  const patientIds = patients.map(p => p.id);
  const meals = await db('meals').whereIn('patient_id', patientIds);
  return patients.map(patient => ({
    ...patient,
    meals: meals.filter(m => m.patient_id === patient.id)
  }));
};

export const getPatientById = async (id) => {
  const patient = await db('patients').where({ id }).first();
  if (!patient) {
    throw new Error('Patient not found');
  }
  const meals = await db('meals').where({ patient_id: id });
  return { ...patient, meals };
};

export const updatePatient = async (id, data) => {
  const { meals, ...patientData } = data;
  const imc = patientData.peso && patientData.altura ? patientData.peso / (patientData.altura * patientData.altura) : undefined;

  const [patient] = await db('patients')
    .where({ id })
    .update({
      ...patientData,
      imc
    })
    .returning('*');
  if (!patient) {
    throw new Error('Patient not found');
  }

  if (meals) {
    await db('meals').where({ patient_id: id }).del();
    if (meals.length) {
      await db('meals').insert(
        meals.map(meal => ({
          patient_id: id,
          type: meal.type,
          description: meal.description
        }))
      );
    }
  }

  return {
    ...patient,
    meals: meals || []
  };
};

export const deletePatient = async (id) => {
  const deleted = await db('patients').where({ id }).del();
  if (!deleted) {
    throw new Error('Patient not found');
  }
};