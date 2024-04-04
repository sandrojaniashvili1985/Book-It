import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
  },
  photos: {
    type: [String],
  },
  description: {
    type: String,
    // required: true,
  },
  title: {
    type: String,
    required: true,
  },
  checkIn: {
    type: String,
  },
  checkOut: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  perks: {
    wifi: Boolean,
    parking: Boolean,
    tv: Boolean,
    pets: Boolean,
    privetEntrance: Boolean,
  },
  cheapestPrice: {
    type: Number,
  },
  feature: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Hotel", HotelSchema);
