import { Request, Response } from 'express';

import ExerciseModel from '../models/exercise.model';
import { parse } from 'path';

export const getExercises = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = 1, limit = 10, name, levelId, categoryId, bodyPart} = req.query;
        const filters: any = {};

        if (name) filters.name = { contains: name as string, mode: 'insensitive' };
        if (levelId) filters.levelId = levelId;
        if (categoryId) filters.categoryId = categoryId;

        if (bodyPart) {
            filters.bodyParts = {
                some: {
                    id: bodyPart
                }
            };
        }

        const result = await ExerciseModel.getExercises(
            parseInt(page as string),
            parseInt(limit as string),
            filters
        );

        res.status(200).json({
            data: result.exercises,
            total: result.totalExercises,
            page: parseInt(page as string),
            totalPages: result.totalPages
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getExerciseById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const exercise = await ExerciseModel.getById(id);
        res.status(200).json(exercise);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};