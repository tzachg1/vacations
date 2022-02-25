import UserModel from "../03-Models/user-model";
import User from "../03-Models/interfaces/User-interface";
import { DeleteResult, UpdateResult } from 'mongodb';

async function getAllUsers(): Promise<User[]> {
    try{
        const result = await UserModel.find().exec();
        return result;
    }catch(err){
        console.log(err);
    }   
}
async function getUserById(id: String): Promise<User> {
    try{
        const result = await UserModel.findById(id).exec();
        return result;
    }catch(err){
        console.log(err);
    }   
}
async function getUserByUsername(username: String): Promise<User> {
    try{
        const result = await UserModel.findOne({username}).exec();
        return result;
    }catch(err){
        console.log(err);
    }   
}
async function create(user: User): Promise<User> {
    try{
        const newUser = new UserModel(user);
        await newUser.save();
        return newUser;
    }catch(err){
        console.log(err);
    }
}
async function update(user: User): Promise<UpdateResult> {
    try{
        const result = await UserModel.updateOne({ _id: user._id }, user);
        return result;
    }catch(err){
        console.log(err);
    }   
}
async function deleteUser(id: String): Promise<DeleteResult> {
    try{
        const result = await UserModel.deleteOne({_id: id});
        return result;
    }catch(err){
        console.log(err);
    }   
}
async function usernameCheck(username: String): Promise<Boolean> {
    try{
        const userExists = await UserModel.findOne({username});
        return userExists !== null;
    }catch(err){
        console.log(err);
    }
}
export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
    create,
    update,
    deleteUser,
    usernameCheck
};