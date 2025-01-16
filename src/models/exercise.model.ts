import { PrismaClient, Exercise } from '@prisma/client';

const prisma = new PrismaClient();

class ExerciseModel {

    static async getExercises(page: number = 1, limit: number = 10, filters: any = {}): 
    Promise<{ exercises: Exercise[], totalExercises: number, totalPages: number }> {
        const exercises = await prisma.exercise.findMany({
            where: filters,
            skip: (page - 1) * limit,
            take: limit
        });

        const totalExercises = await prisma.exercise.count({
            where: filters
        });

        const totalPages = Math.ceil(totalExercises / limit);

        return {
            exercises,
            totalExercises,
            totalPages
        };
    }

    static async getById(id: string): Promise<Exercise> {
        return await prisma.exercise.findUnique({
            where: {
                id: id
            }
        });
    }
}

export default ExerciseModel;