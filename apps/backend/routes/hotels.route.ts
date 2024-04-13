import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotelById,
  getHotelByOwner,
  getHotels,
  updateHotel,
  uploadPhotoByFile,
  uploadPhotoByLink,
} from "../controller/hotels.controller";
import { verifyHotelOwner, verifyToken } from "../middleware/verify.token";
import path from "path";
import multer from "multer";

const router = express.Router();

// CREATE
router.post("/", verifyToken, createHotel);

// update
router.put("/:id", verifyToken, verifyHotelOwner, updateHotel);

// delete
router.delete("/:id", verifyToken, verifyHotelOwner, deleteHotel);

// get by id
router.get("/:id", getHotelById);

// get all
router.get("/", getHotels);

// get hotels by owner id
router.get("/owner/:id", verifyToken, verifyHotelOwner, getHotelByOwner);

router.post("/uploadByLink", uploadPhotoByLink);

const photosMiddleware = multer({ dest: path.join(__dirname, "../uploads") });
router.post(
  "/uploadPhotoByFile",
  photosMiddleware.array("photos", 100),
  uploadPhotoByFile
);

export default router;
