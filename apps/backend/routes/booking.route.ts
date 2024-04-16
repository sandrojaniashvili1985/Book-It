import express from "express";
import {
  createBooking,
  getBookings,
  getBookingsForPlaceId,
  getBookingsForPlaceIdAndReservationID,
} from "../controller/booking.controller";
import { verifyToken, verifyHotelOwner } from "../middleware/verify.token";

const router = express.Router();

// CREATE
router.post("/", verifyToken, createBooking);

// READ
router.get("/", verifyToken, getBookings);

// get bookings for a place only for the owner
router.get("/:placeID", verifyToken, verifyHotelOwner, getBookingsForPlaceId);

// get bookings for a place visitor or owner
router.get(
  "/:placeID/:reservationID",
  verifyToken,
  verifyHotelOwner,
  getBookingsForPlaceIdAndReservationID
);

export default router;
