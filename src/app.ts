import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import exampleRouter from './routes/example.route';
import exerciseRouter from './routes/exercise.route';
import userRouter from './routes/user.route';
import levelRouter from './routes/level.route';
import equipmentRouter from './routes/equipment.route';
import bodyPartRouter from './routes/bodypart.route';
import categoryRouter from './routes/category.route';
import exerciseImageRouter from './routes/exerciseimage.route';
import trainingPlanRouter from './routes/trainingplan.route';
import trainingDayRouter from './routes/trainingday.route';

import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import { jwtCheck, syncUser } from './auth/middleware';
const app: Application = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
// app.use(jwtCheck, syncUser);
// Rutas
app.use('/api/examples', exampleRouter);
app.use('/api/exercises', exerciseRouter);
app.use('/api/users', userRouter);
app.use('/api/levels', levelRouter);
app.use('/api/equipments', equipmentRouter);
app.use('/api/bodyparts', bodyPartRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/exerciseimages', exerciseImageRouter)
app.use('/api/trainingplans', trainingPlanRouter);
app.use('/api/trainingdays', trainingDayRouter);

export default app;
