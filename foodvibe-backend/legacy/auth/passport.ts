import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { handleGoogleCallback } from "../controllers/authController";
import prisma from "./database";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
const GOOGLE_CALLBACK_URL = `http://localhost:${process.env.PORT}/api/auth/google/callback` as string;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    handleGoogleCallback
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const numericId = Number(id);

    if (isNaN(numericId)) {
      return done(new Error("Invalid user ID"));
    }
    const user = await prisma.user.findUnique({
      where: { id: numericId },
    });
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
