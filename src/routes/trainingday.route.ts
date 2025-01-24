import express from 'express';
import { getTrainingDay, addExerciseToTrainingDay, removeExerciseFromTrainingDay } from '../controllers/trainingday.controller';

const trainingDayRouter = express.Router();

trainingDayRouter.get('/:id', getTrainingDay);
trainingDayRouter.patch('/:id/exercise', addExerciseToTrainingDay);
trainingDayRouter.patch('/:id/exercise', removeExerciseFromTrainingDay);

export default trainingDayRouter;