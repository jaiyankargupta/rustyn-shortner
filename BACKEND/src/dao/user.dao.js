import User from "../configs/models/user.model.js";

export const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    throw new Error("Invalid user ID");
  }
};
