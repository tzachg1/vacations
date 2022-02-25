
import express, { NextFunction, Request, Response } from "express";
import verifyAdmin from "../02-Middleware/verify-admin";
import vacationLogic from '../05-BLL/vacation-logic';

const router = express.Router();

router.get('/',async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const result = await vacationLogic.getVacations();
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
router.get('/:id',async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const vacation = req.params.id;
        const result = await vacationLogic.getVacationById(vacation);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
router.post('/create',verifyAdmin, async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const vacation= req.body;
        const result = await vacationLogic.create(vacation);
        res.status(201).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
router.put('/update',verifyAdmin, async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const vacation = req.body;
        const result = await vacationLogic.update(vacation);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
router.put('/follow', async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const vacation = req.body;
        const result = await vacationLogic.update(vacation);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
router.delete('/delete/:id',verifyAdmin, async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const id = req.params.id;
        const result = await vacationLogic.deleteVacation(id);
        res.status(204).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
export default router;