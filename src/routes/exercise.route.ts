import express from 'express';
import { getExercises, getExerciseById, createExercise, addExerciseImage, removeExerciseImage,
    addExerciseBodyPart, removeExerciseBodyPart,
 } from '../controllers/exercise.controller';

const exerciseRouter = express.Router();

exerciseRouter.get('/', getExercises);
exerciseRouter.get('/:id', getExerciseById);
exerciseRouter.post('/', createExercise);
exerciseRouter.patch('/:id/add-image', addExerciseImage);
exerciseRouter.patch('/:id/remove-image', removeExerciseImage);
exerciseRouter.patch('/:id/add-bodypart', addExerciseBodyPart);
exerciseRouter.patch('/:id/remove-bodypart', removeExerciseBodyPart);

export default exerciseRouter;
