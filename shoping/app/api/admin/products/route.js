import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export async function GET() {
  await connectDB();
  const products = await Product.find();
  return Response.json(products);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newProduct = await Product.create(data);
  return Response.json(newProduct);
}

export async function DELETE(req) {
  await connectDB();
  const { _id } = await req.json();
  await Product.findByIdAndDelete(_id);
  return Response.json({ message: "Deleted" });
}
