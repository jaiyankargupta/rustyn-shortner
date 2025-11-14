import jwt from "jsonwebtoken";
import {
  registerUserService,
  loginUserService,
  getUserProfileService,
  isPasswordValidService,
  updateUserProfileService,
} from "../services/auth.service.js";
import { verifyToken } from "../services/jwt.service.js";
// Update the path below if your model file is in a different directory
import shortUrl from "../configs/models/shortUrl.model.js";
import { cookiesOptions } from "../configs/config.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const response = await registerUserService({ name, email, password });

    if (response.newUser) {
      res.status(200).json({ message: "User registered successfully" });
    } else {
      res.status(400).json({ message: "User registration failed" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const tokenResult = await loginUserService({ email, password });

      res.cookie("accessToken", tokenResult.token, cookiesOptions);
      res.status(200).json({ message: "User logged in successfully" });
    } else {
      res.status(400).json({ message: "Email and password are required" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = await verifyToken(accessToken);
    const decodedId = decoded._id;
    const user = await getUserProfileService(decodedId);

    if (!user) {
      return res.status(404).json({ message: "Credential not valid" });
    }

    const { name, email } = user;

    res.status(200).json({
      message: "User profile retrieved successfully",
      name,
      email,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAnalytic = async (req, res) => {
  try {
    const accessTokenCookie = req.cookies.accessToken;
    const decoded = jwt.verify(accessTokenCookie, process.env.JWT_SECRET);
    const userId = decoded._id;

    const urls = await shortUrl.find({ user: userId });

    const totalClicks = urls.reduce((acc, curr) => acc + curr.clicks, 0);

    res.status(200).json({
      email: decoded.email,
      totalUrls: urls.length,
      totalClicks,
      urls,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get analytics" });
  }
};

export const isPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = req.cookies.accessToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const isPass = await isPasswordValidService({ email, password });
    res.send(isPass, { message: "Password validation successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDetails = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const token = req.cookies.accessToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("[UPDATE] Request Body:", req.body);
    console.log("[UPDATE] Received Token:", token);
    console.log("[UPDATE] Decoded Token:", decoded);

    const { newToken, message } = await updateUserProfileService({
      name,
      email,
      password,
      decodedToken: decoded,
      token,
    });

    res.cookie("accessToken", newToken, cookiesOptions);
    return res.status(200).json({ message });
  } catch (error) {
    console.log("[UPDATE] Error:", error.message);
    return res.status(400).json({ message: error.message });
  }
};
