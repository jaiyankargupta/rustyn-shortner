import shortUrl from "../configs/models/shortUrl.model.js";
import { generateNanoId } from "../utils/helper.js";
import jwt from "jsonwebtoken";
import redis from "../configs/redis.config.js";

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

  // Save the data to MongoDB
  await newUrl.save();

  // Cache the mapping in Redis
  try {
    await redis.set(id, url);
  } catch (err) {
    console.error("Failed to cache URL in Redis:", err);
  }

  return short_url;
};

export const getFullUrlService = async (id, res, req) => {
  let destinationUrl = null;

  try {
    destinationUrl = await redis.get(id);
  } catch (err) {
    console.error("Redis fetch error:", err);
  }

  if (destinationUrl) {
    shortUrl.findOneAndUpdate(
      { shortId: id },
      { $inc: { clicks: 1 } }
    ).catch((err) => console.error("Async click increment failed:", err));
  } else {
    const urlDoc = await shortUrl.findOneAndUpdate(
      { shortId: id },
      { $inc: { clicks: 1 } }
    );
    if (urlDoc) {
      destinationUrl = urlDoc.full_url;
      // Cache the result in Redis for future requests
      try {
        await redis.set(id, destinationUrl);
      } catch (err) {
        console.error("Failed to populate cache in Redis:", err);
      }
    }
  }

  if (destinationUrl) {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="refresh" content="1;url=${destinationUrl}" />
        <title>Redirecting...</title>
        <style>
          body {
            background-color: #ffffff;
            color: #374151;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            position: relative;
          }
          .container {
            text-align: center;
            padding: 24px;
          }
          h1 {
            font-size: 1.25rem;
            font-weight: 500;
            margin-bottom: 8px;
            color: #111827;
          }
          p {
            font-size: 0.875rem;
            color: #6b7280;
          }
          .github-tag {
            position: absolute;
            top: 24px;
            right: 24px;
            font-size: 0.85rem;
            color: #9ca3af;
            text-decoration: none;
          }
          .github-tag:hover {
            color: #374151;
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <a href="https://github.com/jaiyankargupta" target="_blank" rel="noopener noreferrer" class="github-tag">
          github: jaiyankargupta
        </a>
        <div class="container">
          <h1>Redirecting you to your destination...</h1>
          <p>Please wait. This will take only a second.</p>
        </div>
        <script>
          setTimeout(() => {
            window.location.href = "${destinationUrl}";
          }, 1000);
        </script>
      </body>
      </html>
    `);
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
