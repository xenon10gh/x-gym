import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import exampleRouter from './routes/example.route';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/examples', exampleRouter);

export default app;
