import express from 'express';
const colors = require('colors');
import { errorHandler } from './middleware/errorMiddleware';
import { connectDB } from './config/db';
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: any, res: any) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API' });
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
