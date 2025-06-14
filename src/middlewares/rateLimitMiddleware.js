import rateLimit from 'express-rate-limit';

// Rate limiting para login
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // 10 tentativas
  message: { error: 'Too many login attempts, try again in 15 minutes' }
});