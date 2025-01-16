import express from 'express';
import { getExercises, getExerciseById } from '../controllers/exercise.controller';

const exerciseRouter = express.Router();

exerciseRouter.get('/', getExercises);
exerciseRouter.get('/:id', getExerciseById);

export default exerciseRouter;