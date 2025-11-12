"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });

  const fetchProducts = async () => {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", price: "", stock: "" });
    fetchProducts();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">🛒 Manage Products</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <Input
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <Input
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          required
        />
        <Button type="submit">Add</Button>
      </form>

      <div className="grid gap-3">
        {products.map((p) => (
          <Card key={p._id} className="p-4 flex justify-between">
            <div>
              <p className="font-medium">{p.name}</p>
              <p>${p.price} — Stock: {p.stock}</p>
            </div>
            <Button
              variant="destructive"
              onClick={async () => {
                await fetch("/api/admin/products", {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ _id: p._id }),
                });
                fetchProducts();
              }}
            >
              Delete
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
