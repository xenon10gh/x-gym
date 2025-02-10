import { PrismaClient, Workout } from '@prisma/client'
import { toUSVString } from 'util';

const prisma = new PrismaClient();

class WorkoutModel {

    static async getWorkouts(page: number = 1, limit: number = 10, filters: any = {}):
    Promise<{ workouts: Workout[], totalWorkouts: number, totalPages: number}> {
        
        const workouts = await prisma.workout.findMany({
            where: filters,
            skip: (page - 1) * limit,
            take: limit,
            include: {
                trainingDay: true,
                user: true,
            }
        });

        const totalWorkouts = await prisma.workout.count({
            where: filters
        })

        const totalPages = Math.ceil(totalWorkouts / limit);

        return {
            workouts,
            totalWorkouts,
            totalPages
        };
    }

    static async getWorkoutById(id: string): Promise<Workout | null> {
        return await prisma.workout.findUnique({
            where: {
                id: id
            },
            include: {
                trainingDay: {
                    include: {
                        exercises: true
                    }
                },
                user: true,
                exercises: true
            }
        });
    }

    static async createWorkout(data: any): Promise<Workout> {
        return await prisma.workout.create({
            data: data,
            include: {
                trainingDay: {
                    include: {
                        exercises: true
                    }
                },
                user: true
            }
        });
    }

    static async updateLevel(id: string, data: any): Promise<Workout> {
        return await prisma.workout.update({
            where: {
                id: id
            },
            data: data,
            include: {
                trainingDay: {
                    include: {
                        exercises: true
                    }
                },
                user: true,
                exercises: true
            }
        })
    }

    static async deleteWorkout(id: string): Promise<Workout> {
        return await prisma.workout.delete({
            where: {
                id: id
            }
        })
    }

}

export default WorkoutModel