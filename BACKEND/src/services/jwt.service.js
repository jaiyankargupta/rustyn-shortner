import jwt from "jsonwebtoken";

export const generateToken = (userId, email) => {
  const token = jwt.sign({ _id: userId, email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
