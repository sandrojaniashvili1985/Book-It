import express from "express";
import { verifyToken } from "../middleware/verify.token";
import {
  createRoom,
  deleteRoom,
  getRoomById,
  getRooms,
  updateRoom,
} from "../controller/rooms.controller";

const router = express.Router();

// CREATE
router.post("/:hotelId", createRoom);

// update
router.put("/:id", updateRoom);

// delete
router.delete("/:id/:hotelId", deleteRoom);

// get by id
router.get("/:id", getRoomById);

// get all
router.get("/", getRooms);

export default router;
