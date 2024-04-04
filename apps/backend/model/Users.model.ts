import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    token: {
      r: { type: Number },
      createdAt: { type: Number },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
