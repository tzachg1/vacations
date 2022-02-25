import { Request } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import User from "../03-Models/interfaces/user-interface";
import config from "./config";

const secretKey = "TZACH_VACATION_KEY";

function generateToken(user: User): string {
    const payload = { user };
    const token = jwt.sign(payload, secretKey, { expiresIn: config.loginExpiresIn });
    return token;
}

function verifyToken(request: Request): Promise<boolean> {
    return new Promise((resolve, reject) => {
        try {
            if (!request.headers.authorization) {
                resolve(false);
                return;
            }
            const token = request.headers.authorization.substring(7);
            if (!token) {
                resolve(false);
                return;
            }
            jwt.verify(token, secretKey, (err: VerifyErrors, payload: JwtPayload) => { 
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        }
        catch (err: any) {
            reject(err);
        }
    });
}

function getUserFromToken(request: Request): User {
    const token = request.headers.authorization.substring(7);
    const payload = jwt.decode(token);
    const user = (payload as any).user;
    return user;
}

export default {
    generateToken,
    verifyToken,
    getUserFromToken
};
