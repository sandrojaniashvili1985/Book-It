import jwt from "jsonwebtoken";
import { createError } from "../utils/error";
import User from "../model/users.model";
import Hotel from "../model/hotel.model";

const SECRET = process.env.JWT_SECRET || "VERY-TOP-SECRET";
const expiresIn = "90d";

export function accessToken(user) {
  const r = Math.random();
  const createdAt = Date.now();
  const token = jwt.sign({ user, createdAt, r }, SECRET, {
    expiresIn,
  });

  return {
    r,
    createdAt,
    token,
  };
}

export function verifyToken(req, res, next) {
  const validDate = Date.now() - 1000 * 60 * 25;
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json("Access denied");
  }

  jwt.verify(token, SECRET, async (err, { r, user, createdAt }) => {
    if (err) {
      return next(createError(403, "Invalid token"));
    }
    if (createdAt < validDate) {
      const userFromDb = await User.findOne({ _id: user._id });

      if (
        !userFromDb ||
        userFromDb.token?.r != r ||
        userFromDb.token?.createdAt != createdAt
      ) {
        return next(createError(403, "Token has expired"));
      }

      const newToken = accessToken(user);
      userFromDb.token = { r: newToken.r, createdAt: newToken.createdAt };
      await userFromDb.save();
    }
    req.user = user;
    next();
  });
}

export async function verifyHotelOwner(req, res, next) {
  const hotel = await Hotel.find({
    _id: req.params.id,
    owner: req.user._id,
  });
  if (!hotel) {
    return res.status(403).json("You are not authorized");
  }

  req.hotel = hotel;
  next();
}
