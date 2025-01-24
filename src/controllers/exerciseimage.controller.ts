import { Request, Response } from 'express';
import ExerciseImageModel from '../models/exerciseimage.model';

export const getExerciseImageById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const exerciseImage = await ExerciseImageModel.getById(id);
        res.status(200).json(exerciseImage);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}