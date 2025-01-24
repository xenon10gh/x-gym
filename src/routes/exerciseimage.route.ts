import express from 'express';
import { getExerciseImageById } from '../controllers/exerciseimage.controller';

const exerciseImageRouter = express.Router();

exerciseImageRouter.get('/:id', getExerciseImageById);

export default exerciseImageRouter;