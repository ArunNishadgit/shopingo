// app/products/page.js
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/products";
import Link from "next/link";

export default async function ProductsPage() {
  await connectDB();
  const products = await Product.find().lean();

  return (
    <div style={{ maxWidth: 900, margin: "20px auto" }}>
      <h1>All Products</h1>

      {products.length === 0 && <p>No products yet.</p>}

      <div style={{ display: "grid", gap: 12 }}>
        {products.map((p) => (
          <div key={p._id} style={{ border: "1px solid #ccc", padding: 12, borderRadius: 6 }}>
            <h3>{p.name || p.title}</h3>
            <p>Price: {p.price}</p>
            <p>{p.description?.slice(0, 120)}</p>

            {/* Link to the dynamic edit/view page */}
            <Link href={`/products/${p._id}`}>View / Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
