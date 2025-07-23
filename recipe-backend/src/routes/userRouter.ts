import express from "express";
import {
  updateUserImage,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController";
import {
  authenticateToken,
  authorizeAdmin,
  authorizeUserAndExist,
} from "../middleware/authMiddleware";
import { validateUser } from "../middleware/validateMiddleware";
import { singleImageUpload } from "../middleware/uploadMiddleware";

const router = express.Router();

router.get("/get-user/", authenticateToken, authorizeUserAndExist, getUserById);
router.get("/", authenticateToken, authorizeAdmin, getAllUsers);
router.put(
  "/",
  authenticateToken,
  authorizeUserAndExist,
  validateUser,
  updateUser
);
router.post(
  "/add-image",
  authenticateToken,
  authorizeUserAndExist,
  singleImageUpload,
  updateUserImage
);
router.delete("/", authenticateToken, authorizeUserAndExist, deleteUser);

export default router;
