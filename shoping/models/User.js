import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  work: String,
  profession: String,
  location: String,
  mobile: String,
  email: String,
});

export default mongoose.models.User || mongoose.model("User", userSchema);


