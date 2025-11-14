//userDetails
import { BACKEND_URL } from "../config/api.config.js";

export const fetchUserDetails = async () => {
  const response = await fetch(`${BACKEND_URL}/api/auth/profile`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch user details");
  }
  return data;
};

export const handleShortUrl = async (Input, frontendUrl) => {
  const response = await fetch(`${BACKEND_URL}/api/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      url: Input,
      frontendUrl: frontendUrl,
    }),
  });

  const text = await response.text();
  console.log(text);

  return await text;
};
