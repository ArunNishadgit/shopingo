import {connectDB} from "@/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import products from "@/models/products";

export async function GET(req, { params }) {
  await connectDB();
  const { id } = params;

  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const product = await Product.findById(id);
  return NextResponse.json(product);
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = params;
  const data = await req.json();

  const updated = await Product.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = params;

  await products.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
