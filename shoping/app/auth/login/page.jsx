"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/auth/register"); // 👈 jis page pe jana hai wo path yahan likho
  };

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      callbackUrl: "/dashboard",
    });

  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded mt-10 text-center">
      <h1 className="text-2xl font-bold mb-4">🔐welcome back Login</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
      </form>

      <hr className="my-4" />
      <div className="flex item-center gap-6">
      <button
        onClick={handleRedirect}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >signup
      </button>
      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="bg-red-500 text-white px-4 py-2 rounded w-full"
      >
        Continue with Google
      </button>
      </div>
    </div>
  );
}
