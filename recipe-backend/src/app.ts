import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import passport  from './config/passport'
import cors from 'cors';
import {errorHandler} from './middleware/errorHandler';   
import recipeRouter from './routes/crudRecipesRouter';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';
import aiRouter from './routes/aiRouter';
import session from 'express-session';
import cookieParser from 'cookie-parser';

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
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use(cors(corsOptions));

app.use(
    session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/crud-recipes',recipeRouter);
app.use('/api/auth',authRouter);
app.use('/api/user', userRouter)
app.use("/api/ai-recipes", aiRouter)

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});