import { generateToken } from "../services/jwt.service.js";
import bcrypt from "bcrypt";
import { createUser, getUserByEmail, getUserById } from "../dao/user.dao.js";

export const registerUserService = async ({ name, email, password }) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    password = hashedPassword;
    // Create a new user
    const newUser = await createUser({
      name,
      email,
      password,
    });
    if (!newUser) {
      throw new Error("User registration failed");
    }

    return { newUser };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginUserService = async ({ email, password }) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Generate a new token for the user
    const token = await generateToken(user._id, email);
    return { token };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserProfileService = async (id) => {
  try {
    const user = await getUserById(id);

    if (!user) {
      throw new Error("credential not valid");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const isPasswordValidService = async ({ email, password }) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return { message: "credential not valid" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { message: "Invalid credentials" };
    }
    return { isPasswordValid };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUserProfileService = async ({
  name,
  email,
  password,
  decodedToken,
  token,
}) => {
  try {
    console.log("[SERVICE] Start update for userId:", decodedToken._id);

    let existingUser = null;

    if (email !== decodedToken.email) {
      existingUser = await getUserByEmail(email);
      if (existingUser) {
        throw new Error("Existing user with this email");
      }

      // generate new token with updated email
      token = await generateToken(decodedToken._id, email);
    }

    if (!token) {
      throw new Error("Failed to generate token");
    }

    const userDetails = await getUserById(decodedToken._id);
    if (!userDetails) {
      throw new Error("User not found");
    }

    // Update fields
    userDetails.name = name;
    userDetails.email = email;

    if (password && password !== "") {
      const saltRounds = 10;
      userDetails.password = await bcrypt.hash(password, saltRounds);
    }

    await userDetails.save();

    console.log("[SERVICE] Token generated:", token);
    return { newToken: token, message: "User profile updated successfully" };
  } catch (error) {
    console.log("[SERVICE ERROR]", error.message);
    throw new Error(error.message);
  }
};
