import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/book-it-app"
  );
  console.log("Connected to MongoDB");

  import("./Users.model");
};
