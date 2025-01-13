import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import { checkServerIdentity } from "tls";
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

// Middleware to check the JWT
const prisma = new PrismaClient();

const jwtCheck = auth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
  });

// Middleware to sync the users from DB to Auth0

const syncUser = async (req, res, next) => {
  try {
    console.log(req.auth);
    const auth0Id = req.auth.payload.sub;
    const email = req.auth.payload['https://x-gym.com/email'];
    const name = req.auth.payload['https://x-gym.com/name'];
    const picture = req.auth.payload['https://x-gym.com/picture'];

    let user = await prisma.user.findUnique({
      where: {
        auth0Id: auth0Id
      }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          auth0Id: auth0Id,
          email: email,
          name: name,
          picture: picture
        }
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error syncing user' });
  }
};


export { jwtCheck, syncUser };