import { PrismaClient, Level } from '@prisma/client';

const prisma = new PrismaClient();

class LevelModel {

    static async getLevels(filter: any = {}): Promise<Level[]> {
        return await prisma.level.findMany({
            where: filter
        });
    }

    static async getById(id: string): Promise<Level | null> {
        return await prisma.level.findUnique({
            where: {
                id: id
            }
        });
    }
}

export default LevelModel;