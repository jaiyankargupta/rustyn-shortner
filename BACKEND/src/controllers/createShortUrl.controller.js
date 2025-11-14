import shortUrl from "../configs/models/shortUrl.model.js";
import {
  getFullUrlService,
  shortUrlService,
  getFrontendUrlService,
} from "../services/short_url.service.js";
import jwt from "jsonwebtoken";

export const createShortUrl = async (req, res) => {
  const { url, frontendUrl } = req.body;
  let userId = null;

  if (req.cookies.accessToken) {
    try {
      const decoded = jwt.verify(
        req.cookies.accessToken,
        process.env.JWT_SECRET
      );
      userId = decoded._id;
    } catch (error) {
      console.log("Invalid token, ignoring user association");
    }
  }

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };
  if (isValidURL(url)) {
    const response = await shortUrl.findOne({ full_url: url });
    const shortUrlDb = response ? response.shortId : null;
    const fullShortUrl = `${req.protocol}://${req.get("host")}`;
    if (shortUrlDb) {
      const shortFullUrl = `${fullShortUrl}/${shortUrlDb}`;
      console.log("already existed url");
      return res.send(shortFullUrl);
    } else {
      const shortUrlId = await shortUrlService(
        fullShortUrl,
        url,
        frontendUrl,
        userId
      );

      res.send(shortUrlId);
    }
  } else {
    return res.status(500).send({ message: "please use valid url" });
  }
};

export const getFullUrl = async (req, res) => {
  const { id } = req.params;

  getFullUrlService(id, res, req);
};

export const getFrontendUrl = async (req, res) => {
  getFrontendUrlService(req, res);
};
