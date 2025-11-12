import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // for credential login
  image: String,
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
