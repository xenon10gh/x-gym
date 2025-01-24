import { Request, Response } from 'express';
import CategoryModel from '../models/category.model';

export const getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.query;
        const filters: any = {};

        if (name) filters.name = { contains: name as string, mode: 'insensitive' };

        const categories = await CategoryModel.getCategories(filters);
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
