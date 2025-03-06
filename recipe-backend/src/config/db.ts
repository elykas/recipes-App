import mongoose from 'mongoose';
import dotenv from 'dotenv';

const environment = process.env.NODE_ENV || 'development';
if (environment === 'production') {
    dotenv.config({ path: '.env.production' });
} else if (environment === 'test') {
    dotenv.config({ path: '.env.test' });
} else {
    dotenv.config({ path: '.env' });
}

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`Connected to MongoDB at host: ${connect.connection.host}, database: ${connect.connection.name}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
export default connectDB;