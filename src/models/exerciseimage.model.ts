import { PrismaClient, ExerciseImage } from '@prisma/client';

const prisma = new PrismaClient();

class ExerciseImageModel {

    static async getById(id: string): Promise<ExerciseImage | null> {
        return await prisma.exerciseImage.findUnique({
            where: {
                id: id
            }
        });
    }
}

export default ExerciseImageModel;