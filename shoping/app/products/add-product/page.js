"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    images: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      images: form.images.split(",").map((img) => img.trim())
    };

    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    router.push("/products");
  }

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} value={form.title} /><br /><br />
        <input name="price" placeholder="Price" type="number" onChange={handleChange} value={form.price} /><br /><br />
        <input name="category" placeholder="Category" onChange={handleChange} value={form.category} /><br /><br />
        <textarea name="description" placeholder="Description" onChange={handleChange} value={form.description} /><br /><br />
        <input name="images" placeholder="Image URLs, comma separated" onChange={handleChange} value={form.images} /><br /><br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
