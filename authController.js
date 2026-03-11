
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).send({ message: "User already exists" });
    }

    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.status(500).send({ message: "Error hashing password" });
      }

      const newUser = new UserModel({
        name,
        email,
        password: hash
      });

      await newUser.save();

      res.send({ message: "User registered successfully" });
    });

  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { userID: user._id },
          process.env.JWT_SECRET
        );

        res.send({
          message: "Login successful",
          token: token
        });
      } else {
        res.status(400).send({ message: "Invalid password" });
      }
    });

  } catch (error) {
    res.status(500).send({ message: "Login failed" });
  }
};