import express from "express";
import dbConnect from "./src/configs/monogo.config.js";
import cors from "cors";
import auth_routes from "./src/routes/auth.route.js";
import dotenv from "dotenv";
import router from "./src/routes/shortUrl.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Middleware to parse URL-encoded data (e.g., from HTML forms)
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: "localhost:5174",
    credentials: true,
  }),
);

// Add manual CORS headers as fallback
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "localhost:5174");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // preflight response
  }
  next();
});

app.use("/api/auth", auth_routes);

app.use("/api", router);

app.use("/", router);

app.listen(3001, () => {
  dbConnect();
  console.log("i am listening 3001");
});
