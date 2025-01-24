import { PrismaClient, BodyPart } from '@prisma/client';

const prisma = new PrismaClient();

class BodyPartModel {
    
    static async getBodyParts(filter: any = {}): Promise<BodyPart[]> {
        return await prisma.bodyPart.findMany({
            where: filter
        });
    }

    static async getById(id: string): Promise<BodyPart | null> {
        return await prisma.bodyPart.findUnique({
            where: {
                id: id
            }
        });
    }

    static async createBodyPart(data: any): Promise<BodyPart> {
        return await prisma.bodyPart.create({
            data: data
        });
    }

    static async updateBodyPart(id: string, data: any): Promise<BodyPart> {
        return await prisma.bodyPart.update({
            where: {
                id: id
            },
            data: data
        });
    }
}

export default BodyPartModel;