const { MongoClient, ServerApiVersion } = require('mongodb');
import express from 'express';
import { errorHandler } from './controllers/middleware/errorMiddleware';
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;
const DB = process.env.DB;

const uri = DB;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err: any) => {
  const collection = client.db('test').collection('devices');
  client.close();
});

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
