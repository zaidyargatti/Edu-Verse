import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import connectDB from "../config/db.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await connectDB();

    await User.deleteMany();

    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.insertMany([
      {
        name: "Rahul",
        email: "rahul@test.com",
        password: hashedPassword,
        role: "instructor"
      },
      {
        name: "Amit",
        email: "amit@test.com",
        password: hashedPassword,
        role: "instructor"
      },
      {
        name: "Admin",
        email: "admin@test.com",
        password: hashedPassword,
        role: "admin"
      }
    ]);

    console.log("✅ Users seeded with password: 123456");
    process.exit();

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedUsers();