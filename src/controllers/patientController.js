import { createPatient, getPatients, getPatientById, updatePatient, deletePatient } from '../services/patientService.js';

export const createPatientController = async (req, res) => {
  const patient = await createPatient(req.body);
  res.status(201).json(patient);
};

export const getPatientsController = async (req, res) => {
  const filter = req.query.filter;
  const patients = await getPatients(filter);
  res.json(patients);
};

export const getPatientByIdController = async (req, res) => {
  const patient = await getPatientById(Number(req.params.id));
  res.json(patient);
};

export const updatePatientController = async (req, res) => {
  const patient = await updatePatient(Number(req.params.id), req.body);
  res.json(patient);
};

export const deletePatientController = async (req, res) => {
  await deletePatient(Number(req.params.id));
  res.status(204).send();
};