import express from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controller/users.controller";
import { verifyToken } from "../middleware/verify.token";

const router = express.Router();

// update
router.put("/:id", verifyToken, updateUser);

// delete
router.delete("/:id", verifyToken, deleteUser);

// get by id
router.get("/:id", getUserById);

// get all
router.get("/", getUsers);

export default router;
