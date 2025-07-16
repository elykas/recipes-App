import express from "express";
import {
  completeRegister,
  logout,
  refreshToken,
  verifyAuthToken,
} from "../controllers/authController";
import {
  authenticateToken,
  verifyAuthTokenMiddleware,
} from "../middleware/authMiddleware";

const router = express.Router();

router.post("/verify-token", verifyAuthTokenMiddleware, verifyAuthToken);
router.post("/complete-register", authenticateToken, completeRegister);
router.post("/refresh-token", refreshToken);
router.get("/logout", logout);

export default router;
