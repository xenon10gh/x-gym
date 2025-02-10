import express from 'express';
import * as workoutController from  '../controllers/workout.controller';

const workoutRouter = express.Router();

workoutRouter.get('/', workoutController.getWorkouts);
workoutRouter.get('/:id', workoutController.getWorkoutById);
workoutRouter.post('/', workoutController.createWorkout);
workoutRouter.patch('/:id/add-set', workoutController.addWorkoutSetToWorkout);
workoutRouter.patch('/delete-set', workoutController.removeWorkoutSetFromWorkout);
workoutRouter.patch('/update-set', workoutController.updateWorkoutSetFromWorkout);

export default workoutRouter;