import shortUrl from "../configs/models/shortUrl.model.js";
import { generateNanoId } from "../utils/helper.js";
import jwt from "jsonwebtoken";
export const shortUrlService = async (
  fullShortUrl,
  url,
  frontendUrl,
  userId
) => {
  const id = generateNanoId(7);
  const short_url = `${fullShortUrl}/${id}`;
  const newUrl = new shortUrl({
    full_url: url,
    short_url: short_url,
    frontendUrl: frontendUrl,
    user: userId,
    shortId: id,
  });

  //save the data
  newUrl.save();
  return short_url;
};

export const getFullUrlService = async (id, res, req) => {
  const url = await shortUrl.findOneAndUpdate(
    { shortId: id },
    { $inc: { clicks: 1 } }
  );

  if (url) {
    res.redirect(url.full_url);
  } else {
    res.status(404).send("Use Valid Link to shortLink : Tere Aaukat se bahar ");
  }
};

export const getFrontendUrlService = async (req, res) => {
  try {
    const accessToken = req.cookies?.accessToken;

    let frontendUrls = [];

    if (accessToken) {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      const userId = decoded._id;

      const userUrls = await shortUrl.find({ user: userId });

      frontendUrls = userUrls
        .map((item) => item.frontendUrl)
        .filter((url) => url);
    } else {
      const allUrls = await shortUrl.find();

      frontendUrls = allUrls
        .map((item) => item.frontendUrl)
        .filter((url) => url);
    }

    if (frontendUrls.length > 0) {
      return res.redirect(frontendUrls[0]);
    } else {
      return res.status(404).json({ message: "No URL found" });
    }
  } catch (error) {
    console.error("Error fetching frontend URL:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
