import mongoose from "mongoose";

const RoomsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumber: [{ number: Number, unavailableDate: { type: [Date] } }],
  },
  { timestamps: true }
);

export default mongoose.model("Rooms", RoomsSchema);
