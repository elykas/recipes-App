import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController";
import { authenticateToken, authorizeAdmin, authorizeUserAndExist } from "../middleware/authMiddleware";
import { validateUser } from "../middleware/validateMiddleware";
import { userImageUpload } from "../middleware/uploadMiddleware";

const router = express.Router();

router.get("/get-user/", authenticateToken, authorizeUserAndExist, getUserById);
router.get("/", authenticateToken, authorizeAdmin, getAllUsers);
router.put("/", authenticateToken, authorizeUserAndExist, userImageUpload, validateUser, updateUser);
router.delete("/", authenticateToken, authorizeUserAndExist, deleteUser);

export default router;
