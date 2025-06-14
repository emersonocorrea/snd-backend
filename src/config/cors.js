import cors from 'cors';

// Configuração de CORS para permitir apenas o frontend no Netlify
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://seu-projeto.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

export default cors(corsOptions);