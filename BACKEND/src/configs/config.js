export const cookiesOptions = {
  httpOnly: false,
  secure: process.env.NODE_ENV === "production" || process.env.SECURE_COOKIES === "true", // true for HTTPS
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // "None" for cross-origin in production, "Lax" for same-origin in dev
  maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
};
