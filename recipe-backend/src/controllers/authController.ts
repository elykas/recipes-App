import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/userModel";
import { findOrCreateUserService, loginUserService, logoutUserService, registerUserService } from "../services/authService";
import jwt from "jsonwebtoken";
import passport from "passport";

export const googleAuth = passport.authenticate('google', { scope: ['email', 'profile'] });

export const googleAuthCallback = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', { failureRedirect: '/login' }, async (err: Error, user: IUser) => {
        if (err) return next(err);
        if (!user) return res.redirect('/login');

        try {
            req.logIn(user, (err) => {
                if (err) return next(err);

                if (!process.env.JWT_SECRET) {
                    return res.status(500).json({ message: "JWT secret is not defined" });
                }

                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                // Store token securely in a cookie instead of query params
                res.cookie('token', token, { httpOnly: true, secure: true });

                res.redirect('/dashboard');
            });
        } catch (error) {
            next(error);
        }
    })(req, res, next);
};

export const handleGoogleCallback = async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
    try {
        const user = await findOrCreateUserService(profile.id, profile.displayName);
        return done(null, user);
    } catch (error) {
        return done(error);
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        await logoutUserService(req);
        res.clearCookie('token');
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: IUser = req.body;

        const registeredUser = await registerUserService(user);
        if (!registeredUser) {
            res.status(404).json({ message: "Can't register user", success: false });
            return;
        }
        res.status(201).json({ data: registeredUser, success: true });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await loginUserService(email, password);
        if (!user) {
             res.status(404).json({ message: "Can't login user", success: false });
             return;
        }

        if (!process.env.JWT_SECRET) {
                res.status(500).json({ message: "JWT secret is not defined" });
                return;
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: true });
        
        res.status(200).json({ data: user, success: true });
    } catch (error) {
        next(error);
    }
};
