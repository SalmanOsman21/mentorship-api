// import { message } from 'statuses';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const createUser = async (req, res) => {
  const user = new User(req.body);
  const savedUser = await user.save();
  res.status(201).json(savedUser);
};

export const updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.json({ message: `User ${deletedUser._id} deleted` });
};



