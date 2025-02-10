import { PrismaClient, WorkoutSet } from '@prisma/client';

const prisma = new PrismaClient();

class WorkoutSetModel {

    static async getWorkoutSets(workoutId: string): Promise<WorkoutSet[]> {
        return await prisma.workoutSet.findMany({
            where: {
                workoutId: workoutId
            },
            include: {
                exercise: true
            }
        });
    }

    static async getWorkoutSetById(id: string): Promise<WorkoutSet | null> {
        return await prisma.workoutSet.findFirst({
            where: {
                id: id
            },
            include: {
                exercise: true
            }
        });
    }

    static async createWorkoutSet(data: any): Promise<WorkoutSet> {
        return await prisma.workoutSet.create({
            data: data,
            include: {
                exercise: true
            }
        });
    }

    static async updateWorkoutSet(id: string, data: any): Promise<WorkoutSet> {
        return await prisma.workoutSet.update({
            where: {
                id: id
            },
            data: data,
            include: {
                exercise: true
            }
        });
    }

    static async deleteWorkoutSet(id: string): Promise<void> {
        await prisma.workoutSet.delete({
            where: {
                id: id
            }
        });
    }

}

export default WorkoutSetModel;