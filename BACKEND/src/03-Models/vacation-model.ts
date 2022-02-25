import mongoose, { model } from 'mongoose';
import Vacation from './interfaces/vacation-interface';

const Schema = mongoose.Schema;

const vacation = new Schema<Vacation>({
    destination: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    followers: {
        type: Number,
        default: 0
    },
    users: [{
        ref: 'Users',
        type: Schema.Types.ObjectId
    }]
})

export default model<Vacation>('Vacation', vacation);


