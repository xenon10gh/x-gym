import { PrismaClient, Level } from '@prisma/client';

const prisma = new PrismaClient();

class EquipmentModel {
    
    static async getEquipments(filter: any = {}): Promise<Level[]> {
        return await prisma.equipment.findMany({
            where: filter
        });
    }

    static async getById(id: string): Promise<Level | null> {
        return await prisma.equipment.findUnique({
            where: {
                id: id
            }
        });
    }
}

export default EquipmentModel;