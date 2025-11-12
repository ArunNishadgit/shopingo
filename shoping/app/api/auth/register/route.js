import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/users";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed });

    return Response.json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Error registering user" }, { status: 500 });
  }
}
