import express from "express";
import {
  completeRegister,
  googleAuth,
  googleAuthCallback,
  loginUser,
  logout,
  verifyToken,
} from "../controllers/authController";

const router = express.Router();

router.post("/login", loginUser);
router.post("/complete-register", completeRegister);
router.post("/verify-token", verifyToken);
router.get("/logout", logout);
router.get("/google", googleAuth);
router.get("/google/callback", googleAuthCallback);

export default router;
