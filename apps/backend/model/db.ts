import mongoose from "mongoose";
import { error } from "node:console";

export const connectDB = async () => {
  await mongoose.connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/book-it-app"
  );
  console.log("Connected to MongoDB");

  import("./users.model");
};
