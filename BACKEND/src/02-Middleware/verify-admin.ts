import { NextFunction, Request, Response } from "express";
import jwt from "../01-Utils/jwt";
import ClientError from "../03-Models/client-error";
import Role from "../03-Models/interfaces/role";
import User from "../03-Models/interfaces/user-interface";


async function verifyAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    
    const user:User = jwt.getUserFromToken(req);
    if(user.role !== Role.Admin) {
        const error = new ClientError(403, "You are not authorized");
        next(error);
        return;
    }
    next();
}

export default verifyAdmin;
