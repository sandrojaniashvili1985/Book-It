import Rooms from "../model/Rooms.model";
import Hotel from "../model/Hotel.model";
import { createError } from "../utils/error";

export async function createRoom(req, res, next) {
  const hotelId = req.params.hotelId;
  const newRoom = new Rooms(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(
        hotelId,
        { $push: { rooms: savedRoom._id } },
        { new: true }
      );
    } catch (error) {
      next(createError(400, error.message));
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(createError(400, error.message));
  }
}

export async function updateRoom(req, res, next) {
  try {
    const updateRoom = await Rooms.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateRoom);
  } catch (error) {
    next(error);
  }
}

export async function deleteRoom(req, res, next) {
  const hotelId = req.params.hotelId;
  try {
    await Rooms.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndDelete(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(createError(400, error.message));
    }
    res.status(200).json(`Room has been deleted`);
  } catch (error) {
    next(error);
  }
}

export async function getRoomById(req, res, next) {
  try {
    const room = await Rooms.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
}

export async function getRooms(req, res, next) {
  try {
    const rooms = await Rooms.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
}
