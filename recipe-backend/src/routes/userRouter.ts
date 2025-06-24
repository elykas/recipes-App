import express from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/get-user",authenticateToken ,getUserById);
router.get("/",authenticateToken ,getAllUsers);
router.put("/", authenticateToken,updateUser);
router.delete("/",authenticateToken ,deleteUser);

export default router;