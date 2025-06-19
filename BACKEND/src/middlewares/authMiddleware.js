import jwt from "jsonwebtoken";
import { generateToken } from "../services/jwt.service.js";

export const authMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  const accessTokenCookie = req.cookies.accessToken;
  if (!accessTokenCookie) {
    generateToken(email, password);
  }

  jwt.verify(accessTokenCookie, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "token not available" });
    }

    next();
  });
};
