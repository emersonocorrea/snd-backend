import Joi from 'joi';

// Middleware de validação com Joi
export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ error: 'Invalid input', details: error.details });
    }
    next();
  };
};

// Esquemas de validação
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const userSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'user').default('user'),
  status: Joi.string().valid('active', 'inactive').default('active')
});

export const patientSchema = Joi.object({
  nome: Joi.string().min(1).required(),
  prontuario: Joi.string().min(1).required(),
  enfermaria: Joi.string().min(1).required(),
  nivelAssistencia: Joi.string().valid('Nível I (Primário)', 'Nível II (Secundário)', 'Nível III (Terciário)').required(),
  peso: Joi.number().positive().required(),
  altura: Joi.number().positive().required(),
  dieta: Joi.string().min(1).required(),
  observacoes: Joi.string().allow('').optional(),
  meals: Joi.array().items(
    Joi.object({
      type: Joi.string().valid('Desjejum', 'Almoço', 'Lanche', 'Jantar', 'Ceia').required(),
      description: Joi.string().min(1).required()
    })
  ).optional()
});

export const mealQuerySchema = Joi.object({
  type: Joi.string().valid('Desjejum', 'Almoço', 'Lanche', 'Jantar', 'Ceia').required()
});