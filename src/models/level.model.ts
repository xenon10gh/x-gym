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

    static async createLevel(data: any): Promise<Level> {
        return await prisma.level.create({
            data: data
        });
    }

    static async updateLevel(id: string, data: any): Promise<Level> {
        return await prisma.level.update({
            where: {
                id: id
            },
            data: data
        });
    }

    static async deleteLevel(id: string): Promise<Level> {
        return await prisma.level.delete({
            where: {
                id: id
            }
        });
    }
}

export default LevelModel;