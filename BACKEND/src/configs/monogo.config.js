import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const res = await mongoose.connect(process.env.MONDODB_URI);
    console.log(`connected db at ${res.connection.host}`);
  } catch (error) {
    console.log("db connnected error", error);
  }
};

export default dbConnect;
