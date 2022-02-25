import bcrypt from 'bcryptjs'
import jwt from "../01-Utils/jwt";
import ClientError from "../03-Models/client-error";
import Role from "../03-Models/interfaces/role";
import User from "../03-Models/interfaces/user-interface";
import Credentials from "../03-Models/interfaces/Credentials";
import usersLogic from "./users-logic";
import UserModel from "../03-Models/user-model";
import socketLogic from './socket-logic';

async function register(userData: User): Promise<string> {
    if(!this.validatePassword(userData.password)) throw new Error('Password must meet requirements');
    userData.role = Role.User;
    const user  = new UserModel(userData);
    const userExists = await usersLogic.getUserByUsername(userData.username);
    
    if(userExists) throw new ClientError(401, "Username already taken");
    
    user.password = await bcrypt.hash(userData.password, 8);
    await user.save();
    const token = jwt.generateToken(user);
    socketLogic.emitUseRegistered(token);
    return token;
}

async function login(credentials: Credentials): Promise<Object> {

    const user = await usersLogic.getUserByUsername(credentials.username);
    const userPassword = await bcrypt.compare(credentials.password, user.password)
    
    if ( !user || !userPassword ) throw new ClientError(401, "Incorrect username or password");

    const token = jwt.generateToken(user);
    socketLogic.emitUseLogged(token);
    return {token, user};
}

function validatePassword(password: string){
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-@$!%*?&<>/~+;:.,|_`"=”’#^\\[\]{}()])[-@$!%*?&<>/~+;:.,|_`"=”’#^\\[\]{}()A-Za-z0-9]{8,64}$/;
    return passwordPattern.test(password);
}


export default {
    register,
    validatePassword,
    login,
};