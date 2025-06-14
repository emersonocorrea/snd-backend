import logger from '../utils/logger.js';

// Middleware de tratamento de erros
export const errorMiddleware = (err, req, res, next) => {
  logger.error('Unexpected error', { error: err.message, stack: err.stack });
  res.status(500).json({ error: 'Internal server error' });
};