
import express, { NextFunction, Request, Response } from "express";
import jwt from "../01-Utils/jwt";
import verifyToken from "../02-Middleware/verify-token";
import User from "../03-Models/interfaces/user-interface";
import userLogic from '../05-BLL/users-logic';

const router = express.Router();

router.get('/',verifyToken,async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const result = await userLogic.getAllUsers();
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
router.get('/:id',verifyToken,async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const vacation = req.params.id;
        const result = await userLogic.getUserById(vacation);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
router.get('/:username',verifyToken,async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const username = req.params.id;
        const result = await userLogic.getUserByUsername(username);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
router.post('/create',verifyToken,async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const vacation= req.body;
        const result = await userLogic.create(vacation);
        res.status(201).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
router.put('/update',verifyToken,async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const vacation = req.body;
        const result = await userLogic.update(vacation);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
router.delete('/delete/:id',verifyToken,async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const id = req.params.id;
        const result = await userLogic.deleteUser(id);
        res.status(204).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
router.get('/usernameExists/:username',async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const username = req.params.username;
        const result = await userLogic.usernameCheck(username);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
export default router;