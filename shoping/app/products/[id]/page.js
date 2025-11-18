// app/products/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProduct({ params }) {
  // params will be provided here because this is a dynamic route file
  const { id } = params;
  const router = useRouter();

  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setForm({
          name: data.name || data.title || "",
          price: data.price || "",
          description: data.description || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/products");
      } else {
        const err = await res.json();
        alert(err?.error || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Product name" required />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <div>
          <button type="submit">Update</button>
          <button type="button" onClick={() => router.push("/products")} style={{ marginLeft: 8 }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
