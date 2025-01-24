import { PrismaClient, TrainingPlan } from '@prisma/client';

const prisma = new PrismaClient();

class TrainingPlanModel {

    static async getTrainingPlans(filter: any = {}): Promise<TrainingPlan[]> {
        return await prisma.trainingPlan.findMany({
            where: filter
        });
    }

    static async getById(id: string): Promise<TrainingPlan | null> {
        return await prisma.trainingPlan.findUnique({
            where: {
                id: id
            }
        });
    }

    static async createTrainingPlan(data: any): Promise<TrainingPlan> {
        return await prisma.trainingPlan.create({
            data: data,
            include: {
                trainingDays: {
                    include: {
                        exercises: true
                    }
                }
            }
        });
    }

    static async updateTrainingPlan(id: string, data: any): Promise<TrainingPlan> {
        return await prisma.trainingPlan.update({
            where: {
                id: id
            },
            data: data
        });
    }

    static async deleteTrainingPlan(id: string): Promise<TrainingPlan> {
        return await prisma.trainingPlan.delete({
            where: {
                id: id
            }
        });
    }

}

export default TrainingPlanModel;