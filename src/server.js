import express from 'express';
import helmet from 'helmet';
import corsConfig from './config/cors.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import mealRoutes from './routes/mealRoutes.js';
import logger from './utils/logger.js';

const app = express();

// Middlewares
app.use(helmet());
app.use(corsConfig);
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/patients', patientRoutes);
app.use('/meals', mealRoutes);

// Tratamento de erros
app.use(errorMiddleware);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});