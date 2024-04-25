import path from "path";
import Hotel from "../model/Hotel.model";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary";

const SECRET = process.env.JWT_SECRET || "VERY-TOP-SECRET";

export async function createHotel(req: any, res: any, next: any) {
  const newHotel = new Hotel(req.body);
  // add owner to hotel
  const token = req.cookies.token;
  jwt.verify(token, SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).json("you are not authorized");
    }
    newHotel.owner = decoded.user._id;
  });

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
}

export async function updateHotel(req, res, next) {
  try {
    Object.assign(req.hotel, req.body);
    const updatedHotel = await req.hotel.save();
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
}

export async function deleteHotel(req, res, next) {
  try {
    const deleteHotel = await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json(`${deleteHotel?.name} has been deleted`);
  } catch (error) {
    next(error);
  }
}

export async function getHotelById(req, res, next) {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
}

export async function getHotels(req, res, next) {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
}

export async function getHotelByOwner(req, res, next) {
  try {
    const hotels = await Hotel.find({ owner: req.params.id });
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
}

export async function getHotelByCountry(req, res, next) {
  try {
    const hotels = await Hotel.find({ city: req.params.country });
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
}

export async function uploadPhoto(req, res, next) {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "hotels",
    });
    // console.log("uploadedResponse", uploadedResponse);
    res.json(uploadedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
}
