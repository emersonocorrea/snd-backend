import { login, refreshToken } from '../services/authService.js';
import logger from '../utils/logger.js';

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json(result);
  } catch (error) {
    logger.error('Login failed', { error });
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

export const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await refreshToken(refreshToken);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};