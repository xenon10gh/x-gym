import { Request, Response } from 'express';
import TrainingDayModel from '../models/trainingday.model';

export const getTrainingDay = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const trainingDay = await TrainingDayModel.getById(id);
        res.status(200).json(trainingDay);
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const addExerciseToTrainingDay = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { exerciseId } = req.body;
        const data = {
            exercises: {
                connect: { id: exerciseId }
            }
        }
        const updatedTrainingDay = await TrainingDayModel.updateTrainingDay(id, data);
        res.status(200).json(updatedTrainingDay);
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const removeExerciseFromTrainingDay = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { exerciseId } = req.body;
        const data = {
            exercises: {
                disconnect: { id: exerciseId }
            }
        }
        const updatedTrainingDay = await TrainingDayModel.updateTrainingDay(id, data);
        res.status(200).json(updatedTrainingDay);
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }

} 