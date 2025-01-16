import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import exampleRouter from './routes/example.route';
import exerciseRouter from './routes/exercise.route';
import userRouter from './routes/user.route';

import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import { jwtCheck, syncUser } from './auth/middleware';
const app: Application = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(jwtCheck, syncUser);
// Rutas
app.use('/api/examples', exampleRouter);
app.use('/api/exercises', exerciseRouter);
app.use('/api/users', userRouter);

export default app;
