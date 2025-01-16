"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncUser = exports.jwtCheck = void 0;
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
// Middleware to check the JWT
const prisma = new client_1.PrismaClient();
const jwtCheck = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
});
exports.jwtCheck = jwtCheck;
// Middleware to sync the users from DB to Auth0
const syncUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.auth);
        const auth0Id = req.auth.payload.sub;
        const email = req.auth.payload['https://x-gym.com/email'];
        const name = req.auth.payload['https://x-gym.com/name'];
        const picture = req.auth.payload['https://x-gym.com/picture'];
        let user = yield prisma.user.findUnique({
            where: {
                auth0Id: auth0Id
            }
        });
        if (!user) {
            user = yield prisma.user.create({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error syncing user' });
    }
});
exports.syncUser = syncUser;
