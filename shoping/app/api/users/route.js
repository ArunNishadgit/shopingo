// app/api/users/route.js
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  work: String,
  profession: String,
  location: String,
  mobile: String,
  email: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

// 🔹 GET - All Users
export async function GET() {
  try {
    await connectDB();
    const users = await User.find();
    return Response.json(users);
  } catch (error) {
    console.error("GET Error:", error);
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}

// 🔹 POST - Create New User
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const newUser = await User.create(data);
    return Response.json(newUser, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}

// 🔹 PUT - Update User by ID
export async function PUT(req) {
  try {
    await connectDB();
    const { id, ...data } = await req.json();
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

    if (!updatedUser) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(updatedUser);
  } catch (error) {
    console.error("PUT Error:", error);
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}

// 🔹 DELETE - Delete User by ID
export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}
