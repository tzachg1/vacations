import { ObjectId } from 'mongoose';
interface Vacation {
    _id ? : ObjectId
    destination: String;
    img: String;
    startDate: Date;
    endDate: Date;
    price: Number;
    followers: Number;
    users: [string];
}

export default Vacation;