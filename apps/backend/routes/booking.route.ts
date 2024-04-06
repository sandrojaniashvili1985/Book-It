import express from "express";
import { createBooking, getBookings } from "../controller/booking.controller";
import { verifyToken } from "../middleware/verify.token";

const router = express.Router();

// CREATE
router.post("/", verifyToken, createBooking);

// READ
router.get("/", verifyToken, getBookings);

export default router;
