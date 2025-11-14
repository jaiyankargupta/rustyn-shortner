import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema(
  {
    full_url: {
      type: String,
      required: true,
    },
    shortId: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    short_url: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },

    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    frontendUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const shortUrl = mongoose.model("shorturl", shortUrlSchema);

export default shortUrl;
