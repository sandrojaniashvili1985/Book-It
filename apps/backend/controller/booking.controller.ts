import Booking from "../model/Booking.model";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "VERY-TOP-SECRET";

export async function createBooking(req, res, next) {
  const newBooking = new Booking(req.body);
  const token = req.cookies.token;
  jwt.verify(token, SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).json("you are not authorized");
    }
    newBooking.user = decoded.user._id;
  });
  try {
    const savedBooking = await newBooking.save();
    res.status(200).json(savedBooking);
  } catch (error) {
    next(error);
  }
}

export async function getBookings(req, res, next) {
  const token = req.cookies.token;
  jwt.verify(token, SECRET, async function (err, decoded) {
    if (err) {
      return res.status(403).json("you are not authorized");
    }
    try {
      const bookings = await Booking.find({ user: decoded.user._id });
      res.status(200).json(bookings);
      res.set("cache-control", "private, no-store");
    } catch (error) {
      next(error);
    }
  });
}
