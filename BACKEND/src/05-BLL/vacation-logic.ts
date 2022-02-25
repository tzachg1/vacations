import VacationModule from "../03-Models/vacation-model";
import Vacation from "../03-Models/interfaces/vacation-interface";
import { DeleteResult } from 'mongodb';
import socketLogic from "./socket-logic";

async function getVacations(): Promise<Vacation[]> {
    try{
        const result = await VacationModule.find().exec();
        return result;
    }catch(err){
        console.log(err);
    }   
}
async function getVacationById(id: String): Promise<Vacation> {
    try{
        const result = await VacationModule.findById(id).exec();
        return result;
    }catch(err){
        console.log(err);
    }   
}
async function create(vacation:Vacation): Promise<Vacation> {
    try{
        const newVacation = new VacationModule(vacation);
        socketLogic.emitAddProduct(newVacation);
        await newVacation.save();
        return newVacation;
    }catch(err){
        console.log(err);
    }   
}
async function update(vacation:Vacation): Promise<Vacation> {
    try{
        const result = await VacationModule.updateOne({ _id: vacation._id },vacation);
        socketLogic.emitUpdateProduct(vacation);
        if(result.modifiedCount === 1) return vacation;
        throw new Error('no matching document have found')
    }catch(err){
        console.log(err);
    }   
}
async function deleteVacation(id:String): Promise<DeleteResult> {
    try{
        const result = await VacationModule.deleteOne({_id: id});
        socketLogic.emitDeleteProduct(id);
         return result;
    }catch(err){
        console.log(err);
    }   
}
export default {
    getVacations,
    getVacationById,
    create,
    update,
    deleteVacation
};