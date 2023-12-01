import mongoose from 'mongoose';
import dontenv from 'dotenv'
import { Exception } from '../exceptions/Exceptions';
import { OutputType, print } from '../helpers/print';

dontenv.config();


const connectDB = async () => {
    const mongo_url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@school.zchou4c.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(mongo_url);
        print("MongoDB connected", OutputType.SUCCESS);
    } catch (error) {
        print(`Can not connect MongoDB with message: ${error}`, OutputType.ERROR);
    }
}
export {
    connectDB,
}