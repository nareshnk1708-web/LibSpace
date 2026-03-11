import User from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new User({
      name,
      email,
      password
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};