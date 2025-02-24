import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import passport  from './config/passport'
import cors from 'cors';
import {errorHandler} from './middleware/errorHandler';   
import recipeRouter from './routes/crudRecipesRouter';
import authRouter from './routes/authRouter';
import session from 'express-session';

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
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: true,
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

app.use('/api/crudRecipes',recipeRouter);
app.use('/api/auth',authRouter)

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});