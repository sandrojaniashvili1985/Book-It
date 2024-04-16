import express from "express";
import {
  createBooking,
  getBookings,
  getBookingsForPlaceId,
} from "../controller/booking.controller";
import { verifyToken, verifyHotelOwner } from "../middleware/verify.token";

const router = express.Router();

// CREATE
router.post("/", verifyToken, createBooking);

// READ
router.get("/", verifyToken, getBookings);

// get bookings for a place only for the owner
router.get("/:placeID", verifyToken, verifyHotelOwner, getBookingsForPlaceId);

export default router;
