import express from "express";
import {
  createShortUrl,
  getFullUrl,
  getFrontendUrl,
} from "../controllers/createShortUrl.controller.js";

const router = express.Router();

router.post("/create", createShortUrl);
router.get("/:id", getFullUrl);
router.get("/", getFrontendUrl);
export default router;
