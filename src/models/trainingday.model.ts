import { PrismaClient, TrainingDay } from '@prisma/client';

const prisma = new PrismaClient();

class TrainingDayModel {
    
    static async getTrainingDays(filter: any = {}): Promise<TrainingDay[]> {
        return await prisma.trainingDay.findMany({
            where: filter,
            include: {
                exercises: true
            },
        });
    }

    static async getById(id: string): Promise<TrainingDay | null> {
        return await prisma.trainingDay.findUnique({
            where: {
                id: id
            },
            include: {
                exercises: true
            },
        });
    }

    static async updateTrainingDay(id: string, data: any): Promise<TrainingDay> {
        return await prisma.trainingDay.update({
            where: {
                id: id
            },
            data: data,
            include: {
                exercises: true
            },
        });
    }
}

export default TrainingDayModel;