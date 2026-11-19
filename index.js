
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { logger } from './middlewares/logger.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js'
import uploadRoutes from './routes/upload.js'
import taskRoutes from './routes/tasks.js'

import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger.js';
import { limiter } from './middlewares/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(helmet())

app.use(cors({
  origin: 'http://localhost:5173'
}));


app.use(limiter)


if(process.env.NODE_ENV == "development"){
    app.use(morgan('dev'));
}



// custom middlewares
app.use(logger);

// Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/upload', uploadRoutes)
app.use('/tasks', taskRoutes)



// Error handling
app.use(notFound);
app.use(errorHandler);

// MongoDB Connection
mongoose.connect(process.env.NODE_ENV == "development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRO)
  .then(() => {
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server at http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('DB connection error:', err));
