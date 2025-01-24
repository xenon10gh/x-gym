import { Request, Response } from 'express';
import BodyPartModel from '../models/bodypart.model';

export const getBodyParts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.query;
        const filters: any = {};

        if (name) filters.name = { contains: name as string, mode: 'insensitive' };

        const bodyParts = await BodyPartModel.getBodyParts(filters);
        res.status(200).json(bodyParts);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const createBodyPart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        const bodyPart = await BodyPartModel.createBodyPart({ name });
        res.status(201).json(bodyPart);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateBodyPartName = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const bodyPart = await BodyPartModel.updateBodyPart(id, { name });
        res.status(200).json(bodyPart);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}