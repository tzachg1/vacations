import express, { NextFunction, Request, Response } from "express";
import authLogic from "../05-BLL/auth-logic";

const router = express.Router();

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        const token = await authLogic.register(user);
        res.status(201).json(token);
    }
    catch(err: any) {
        next(err);
    }
});

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const credentials = req.body;
        const token = await authLogic.login(credentials);
        res.status(201).json(token);
    }
    catch(err: any) {
        next(err);
    }
});

export default router;



