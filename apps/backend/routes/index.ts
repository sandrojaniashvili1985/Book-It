// middleware to serve static files
import express from "express";
import authRouter from "./auth.route";
import usersRouter from "./users.route";
import hotelsRouter from "./hotels.route";
import roomsRouter from "./rooms.route";
import bookingRouter from "./booking.route";

const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/users", usersRouter);
router.use("/api/hotels", hotelsRouter);
router.use("/api/rooms", roomsRouter);
router.use("/api/booking", bookingRouter);

export default router;
