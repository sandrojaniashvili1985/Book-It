import path from "node:path";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectDB } from "./model/db";
import router from "./routes/index";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(
  cors({
    origin: "https://book-it-frontend-three.vercel.app",
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.set(
    "cache-control",
    "private, no-store, max-age=0, no-cache, must-revalidate, post-check=0, pre-check=0"
  );
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://book-it-frontend-three.vercel.app"
  );
  // Adjust other CORS headers as needed
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(router);

// app.use("/api/hotels/uploads", express.static(__dirname + "\\uploads"));
const baseUrl = "https://book-it-backend.vercel.app";
app.use(
  "/api/hotels/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, filePath) => {
      res.setHeader("Access-Control-Allow-Origin", baseUrl);
    },
  })
);

app.use("/", (req, res) => {
  res.send("server is running...");
});

app.get("/", (req, res) => {
  res.send("server is running...");
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Internal Server Error";
  return res.status(errorStatus).json({
    success: false,
    message: errorMessage,
    status: errorStatus,
    stack: err.stack,
  });
});

app.use(express.static(path.join(__dirname, "static")));
app.use("*", express.static(path.join(__dirname, "static/index.html")));

const port = process.env.PORT || 3333;

connectDB().catch(() => process.exit(1));

app.listen(port, () => {
  console.log("App is listening at http://localhost:" + port);
});
