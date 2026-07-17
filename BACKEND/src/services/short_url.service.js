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
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="refresh" content="1;url=${url.full_url}" />
        <title>Redirecting...</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
          body {
            background: linear-gradient(135deg, #090d16 0%, #11102e 100%);
            color: #f1f5f9;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
          }
          .circle {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(99, 102, 241, 0) 70%);
            filter: blur(50px);
            z-index: 1;
          }
          .circle-1 {
            width: 500px;
            height: 500px;
            top: -150px;
            left: -150px;
          }
          .circle-2 {
            width: 600px;
            height: 600px;
            bottom: -200px;
            right: -200px;
          }
          .container {
            z-index: 10;
            background: rgba(17, 24, 39, 0.6);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 3rem 2.5rem;
            border-radius: 28px;
            text-align: center;
            max-width: 460px;
            width: 90%;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .github-tag {
            position: absolute;
            top: 2rem;
            right: 2rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 0.6rem 1.2rem;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.875rem;
            font-weight: 500;
            color: #94a3b8;
            text-decoration: none;
            z-index: 20;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .github-tag:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(99, 102, 241, 0.3);
            color: #ffffff;
            transform: translateY(-2px);
          }
          .github-icon {
            width: 18px;
            height: 18px;
            fill: currentColor;
          }
          .loader-container {
            position: relative;
            width: 80px;
            height: 80px;
            margin: 0 auto 2rem;
          }
          .loader {
            width: 100%;
            height: 100%;
            border: 3px solid rgba(99, 102, 241, 0.08);
            border-top-color: #6366f1;
            border-radius: 50%;
            animation: spin 1s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite;
          }
          .loader-inner {
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            bottom: 10px;
            border: 3px solid transparent;
            border-bottom-color: #a855f7;
            border-radius: 50%;
            animation: spin-reverse 1.5s linear infinite;
          }
          h1 {
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 1rem;
            background: linear-gradient(to right, #ffffff, #cbd5e1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -0.02em;
          }
          p {
            color: #94a3b8;
            font-size: 0.95rem;
            line-height: 1.6;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes spin-reverse {
            to { transform: rotate(-360deg); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
        </style>
      </head>
      <body>
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        
        <a href="https://github.com/jaiyankargupta" target="_blank" rel="noopener noreferrer" class="github-tag">
          <svg class="github-icon" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
          <span>jaiyankargupta</span>
        </a>

        <div class="container">
          <div class="loader-container">
            <div class="loader"></div>
            <div class="loader-inner"></div>
          </div>
          <h1>Redirecting you to your destination</h1>
          <p>Please wait while we connect you securely. This will take only a second...</p>
        </div>

        <script>
          setTimeout(() => {
            window.location.href = "${url.full_url}";
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
