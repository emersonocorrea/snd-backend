import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';

// Middleware de autenticação JWT
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    logger.error('Invalid token', { error });
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware para verificar se é admin
export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};