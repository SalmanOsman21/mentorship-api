import User from "../models/User.js";
import { generateToken } from '../utils/generateToken.js';

// Register new user


export const register = async (req, res, next) => {
  try {
    const { name, email, password, profilePic } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      profilePic,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      message: "User registered successfully",
      token,
    });

  } catch (err) {
    next(err);
  }
};


export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    res.json({ token });
    console.log(`login ${user}`)
  } catch (err) {
    next(err);
  }
};



