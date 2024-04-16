import Booking from "../model/Booking.model";
import HotelModel from "../model/Hotel.model";
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
      res.set("cache-control", "private, no-store");
      res.status(200).json(bookings);
    } catch (error) {
      next(error);
    }
  });
}

// get bookings for a place only for the owner
export async function getBookingsForPlaceId(req, res, next) {
  const token = req.cookies.token;
  jwt.verify(token, SECRET, async function (err, decoded) {
    if (err) {
      return res.status(403).json("you are not authorized");
    }
    try {
      const bookings = await Booking.find({
        hotel: req.params.placeID,
      });
      const hotel = await HotelModel.findById(req.params.placeID);
      if (!hotel) {
        return res.status(404).json("Hotel not found");
      }
      if (hotel.owner != decoded.user._id) {
        return res.status(403).json("you are not authorized");
      }
      res.status(200).json(bookings);
    } catch (error) {
      next(error);
    }
  });
}

//  get bookings for a place only visitor or owner
export async function getBookingsForPlaceIdAndReservationID(req, res, next) {
  const token = req.cookies.token;
  jwt.verify(token, SECRET, async function (err, decoded) {
    if (err) {
      return res.status(403).json("you are not authorized");
    }
    try {
      const bookings = await Booking.find({
        hotel: req.params.placeID,
        _id: req.params.reservationID,
      });
      if (!bookings) {
        return res.status(404).json("Reservation not found");
      }
      const hotel = await HotelModel.findById(req.params.placeID);
      if (!hotel) {
        return res.status(404).json("Hotel not found");
      }
      if (
        bookings[0].user == decoded.user._id ||
        decoded.user._id == hotel.owner
      ) {
        res.status(200).json(bookings);
      } else {
        return res.status(403).json("you are not authorized");
      }
    } catch (error) {
      next(error);
    }
  });
}
