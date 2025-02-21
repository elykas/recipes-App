import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import cors from 'cors';
import { connect } from 'http2';

const environment = process.env.NODE_ENV || 'development';
if (environment === 'production') {
    dotenv.config({ path: '.env.production' });
} else if (environment === 'test') {
    dotenv.config({ path: '.env.test' });
} else {
    dotenv.config({ path: '.env' });
}


const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
const corsOptions = {
    origin: true,
    credentials: true,
};
app.use(cors(corsOptions));

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});