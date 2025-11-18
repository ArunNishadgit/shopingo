import { connectDB } from "@/lib/mongodb";
import Products from "@/models/products";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const products = await Products.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const product = await Products.create(body);
  return NextResponse.json(product, { status: 201 });
}
