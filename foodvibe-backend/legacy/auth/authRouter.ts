// import express from "express";
// import {
//   completeRegister,
//   googleAuth,
//   googleAuthCallback,
//   loginUser,
//   logout,
//   refreshToken,
//   verifyTempToken,
// } from "../controllers/authController";
// import { verifyTempTokenMiddleware } from "../middleware/authMiddleware";

// const router = express.Router();

// router.post("/login", loginUser);
// router.post("/complete-register", verifyTempTokenMiddleware, completeRegister);
// router.post("/verify-token", verifyTempTokenMiddleware, verifyTempToken);
// router.get("/logout", logout);
// router.get("/google", googleAuth);
// router.get("/google/callback", googleAuthCallback);
// router.post("/refresh-token", refreshToken);

// export default router;
