export const cookiesOptions = {
  httpOnly: false,
  secure: false,
  // Set to true if using HTTPS
  // secure: process.env.NODE_ENV === "production", // Use this in production
  sameSite: "Lax", // Prevent CSRF attacks
  maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
};
