import path from "path";
import Hotel from "../model/Hotel.model";
import download from "image-downloader";
import fs from "fs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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

// const dirname = path.resolve();
// export async function uploadPhotoByLink(req, res, next) {
//   const { link } = req.body;
//   const newName = "photo" + Date.now() + ".jpg";
//   try {
//     await download.image({
//       url: link,
//       dest: dirname + "\\uploads\\" + newName,
//     });
//     res.status(200).json(newName);
//   } catch (error) {
//     next(error);
//   }
// }

export async function uploadPhotoByLink(req, res, next) {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  const uploadDir = path.join(__dirname, "uploads");

  try {
    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Download the image
    await download.image({
      url: link,
      dest: path.join(uploadDir, newName),
    });

    res.status(200).json(newName);
  } catch (error) {
    next(error);
  }
}

export async function uploadPhotoByFile(req, res, next) {
  const uploadFile = [];
  try {
    const photos = req.files;
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      const newName = "photo" + Date.now() + ".jpg";
      fs.renameSync(photo.path, __dirname + "/uploads/" + newName);
      uploadFile.push(newName);
    }
    res.status(200).json(uploadFile);
  } catch (error) {
    next(error);
  }
}
