import { Request, Response } from 'express';

import TrainingPlanModel from '../models/trainingplan.model';

export const getUserTrainingPlans = async (req: Request, res: Response): Promise<void> => {

    try {
        const { userId } = req.body;
        const trainingPlans = await TrainingPlanModel.getTrainingPlans({ userId: userId });
        res.status(200).json(trainingPlans);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

}

export const getTrainingPlanById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const trainingPlan = await TrainingPlanModel.getById(id);
        res.status(200).json(trainingPlan);
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const createTrainingPlan = async (req: Request, res: Response): Promise<void> => {
    
    try {
        const { userId, name, description, levelId, trainingDays } = req.body;
        // trainingDays Format: [{day: 1, exercises: [exerciseId1, exerciseId2, ...], ... rest of the days}]
        
        // Create trainingPlan

        const trainingPlanData = {
            name: name,
            description: description,
            userId: userId,
            trainingDays: {
                create: trainingDays.map((trainingDay: any) => {
                    return {
                        dayNumber: trainingDay.day,
                        exercises: {
                            connect: trainingDay.exercises.map((exerciseId: string) => {
                                return { id: exerciseId };
                            })
                        }
                    }
                })
            }
        }

        const newTrainingPlan = await TrainingPlanModel.createTrainingPlan(trainingPlanData);

        res.status(201).json(newTrainingPlan);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

}