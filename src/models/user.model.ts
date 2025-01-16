import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

class UserModel {
    
    static async getById(id: string): Promise<User> {
        return await prisma.user.findUnique({
            where: {
                id: id
            }
        });
    }

    static async getByAuth0Id(auth0Id: string): Promise<User> {
        return await prisma.user.findUnique({
            where: {
                auth0Id: auth0Id
            }
        });
    }

    // TO-DO: Delete an user from Auth0 and local DB

    // TO-DO: Update an user from Auth0 and local DB
    
    // TO-DO: Get all users for admin purposes
}

export default UserModel;