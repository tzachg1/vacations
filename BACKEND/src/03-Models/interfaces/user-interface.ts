import { ObjectId } from 'mongoose';
import Role from './role';

interface User {
    _id ? : ObjectId;
    role: Role;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

export default User;