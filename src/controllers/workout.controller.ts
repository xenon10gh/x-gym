import { Request, Response } from 'express';

import WorkoutModel from '../models/workout.model';
import WorkoutSetModel from '../models/workoutset.model';
import { parse } from 'path';
import { totalmem } from 'os';

export const getWorkouts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = 1, limit = 10, trainingDayId, userId, date } = req.query;
        const filters: any = {};

        if (trainingDayId) filters.trainingDayId = trainingDayId;
        if (userId) filters.userId = userId;
        if (date) {
            // Date Format : YYYY-MM-DD
            const parsedDate = new Date(date as string)
            filters.date = parsedDate
        }

        const result = await WorkoutModel.getWorkouts(
            parseInt(page as string),
            parseInt(limit as string),
            filters
        );

        res.status(200).json({
            data: result.workouts,
            total: result.totalWorkouts,
            page: parseInt(page as string),
            totalPages: result.totalPages
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getWorkoutById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const workout = await WorkoutModel.getWorkoutById(id);
        res.status(200).json(workout)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createWorkout = async (req: Request, res: Response): Promise<void> => {
    try {
        const { trainingDayId, userId, notes } = req.body;
        const data: any = {
            trainingDayId: trainingDayId,
            userId: userId,
        };
        if (notes) data.notes = notes;
        const workout = await WorkoutModel.createWorkout(data);
        res.status(200).json(workout)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const addWorkoutSetToWorkout = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { exerciseId, setNumber, reps, weight, weightUnit } = req.body;

        // Crear el modelo de WorkoutSet
        const setData: any = {
            workoutId: id,
            exerciseId: exerciseId,
            setNumber: setNumber,
            reps: reps,
        };
        if (weight) setData.weight = weight; // BodyWeight
        if (weightUnit) setData.weightUnit = weightUnit; // Default "kg"
        const workoutSet = await WorkoutSetModel.createWorkoutSet(setData);
        res.status(200).json(workoutSet)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const removeWorkoutSetFromWorkout = async (req: Request, res: Response): Promise<void> => {
    try {
        const { workoutSetId } = req.body;
        await WorkoutSetModel.deleteWorkoutSet(workoutSetId);
        res.status(200);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateWorkoutSetFromWorkout = async (req: Request, res: Response): Promise<void> => {
    try {
        const { workoutSetId, reps, weight, weightUnit } = req.body;
        const updateData: any = {};

        if (reps) updateData.reps = reps;
        if (weight) updateData.weight = weight;
        if (weightUnit) updateData.weightUnit = weightUnit;

        const updatedWorkoutSet = await WorkoutSetModel.updateWorkoutSet(workoutSetId, updateData);
        res.status(200).json(updatedWorkoutSet)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}