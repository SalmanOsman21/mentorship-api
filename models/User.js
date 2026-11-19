
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { string } from "zod";

const userScheme = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: {
    type : String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  profilePic: string
});

// Hash password before saving
userScheme.pre('save', async function () {

  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password during login
userScheme.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model('User', userScheme);

export default User;
