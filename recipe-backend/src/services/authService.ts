import bycrpt from 'bcrypt';
import { IUser } from '../models/userModel';
import User from '../models/userModel';

export const registerUserService = async (user: IUser) => {
    try {
        const {username, email, password} = user;
        if (!username || !email || !password) {
            throw new Error("Missing required fields");
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bycrpt.hash(password, 10);

        const registeredUser = await User.create({
            username,
            email,
            password: hashedPassword
        });
        return registeredUser;
    } catch (error: any) {
        throw new Error("Failed to register user: " + error.message);
    }
}


export const loginUserService = async (email: string, password: string) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bycrpt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        return user;
    } catch (error:any) { 
        throw new Error("Failed to login user: " + error.message);
    }
}



export const findOrCreateUserService = async (googleId: string, name: string) => {
    try {
        let user = await User.findOne({ googleId });
        if (!user) {
            user = new User({
                googleId,
                name,
            });
            await user.save();
        }
        return user;
    } catch (error) {
        throw new Error('Failed to authenticate user');
    }
};

export const logoutUserService = (req: any) => {
    return new Promise((resolve, reject) => {
        req.logout((err: any) => {
            if (err) reject('Logout failed');
            resolve('Logged out successfully');
        });
    });
};