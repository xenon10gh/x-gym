import { Request, Response } from 'express';

import ExerciseModel from '../models/exercise.model';
import { parse } from 'path';
import { connect } from 'http2';

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

export const createExercise = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, levelId, equipmentId, bodyParts, instructions, categoryId, images } = req.body;
        const exerciseData: any = {
            name: name,
            levelId: levelId,
            equipmentId: equipmentId,
            instructions: instructions,
            categoryId: categoryId,
        }

        if (bodyParts && bodyParts.length > 0) {
            exerciseData.bodyParts = {
                connect: bodyParts.map((bodyPartId: string) => ({ id: bodyPartId }))
            };
        }

        if (images && images.length > 0) {
            exerciseData.images = {
                connect: images.map((imageId: string) => ({ id: imageId }))
            };
        }

        const exercise = await ExerciseModel.createExercise(exerciseData);
        res.status(201).json(exercise);

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const addExerciseImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { imageId } = req.body;

        const data = {
            images: {
                connect: {
                    id: imageId
                }
            }
        }

        const exercise = await ExerciseModel.updateExercise(id, data);
        res.status(200).json(exercise);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const removeExerciseImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { imageId } = req.body;

        const data = {
            images: {
                disconnect: {
                    id: imageId
                }
            }
        }

        const exercise = await ExerciseModel.updateExercise(id, data);
        res.status(200).json(exercise);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const addExerciseBodyPart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { bodyPartId } = req.body;

        const data = {
            bodyParts: {
                connect: {
                    id: bodyPartId
                }
            }
        }

        const exercise = await ExerciseModel.updateExercise(id, data);
        res.status(200).json(exercise);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const removeExerciseBodyPart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { bodyPartId } = req.body;

        const data = {
            bodyParts: {
                disconnect: {
                    id: bodyPartId
                }
            }
        }

        const exercise = await ExerciseModel.updateExercise(id, data);
        res.status(200).json(exercise);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

