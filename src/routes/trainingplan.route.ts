import express from 'express';
import { getUserTrainingPlans, getTrainingPlanById, createTrainingPlan } from '../controllers/trainingplan.controller';

const trainingPlanRouter = express.Router();

trainingPlanRouter.get('/', getUserTrainingPlans);
trainingPlanRouter.get('/:id', getTrainingPlanById);
trainingPlanRouter.post('/', createTrainingPlan);

export default trainingPlanRouter;