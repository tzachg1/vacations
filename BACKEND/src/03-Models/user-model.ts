
import mongoose, { model } from 'mongoose';
import User from './interfaces/user-interface';

const Schema = mongoose.Schema;

const user = new Schema<User>({
    role: {
        default: 1,
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

export default model<User>('User', user);


