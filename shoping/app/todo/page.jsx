"use client";
import { useEffect, useState } from "react";

export default function TodoPage() {
  const [form, setForm] = useState({
    name: "",
    work: "",
    profession: "",
    location: "",
    mobile: "",
    email: "",
  });
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  // 🔹 Fetch todo users data 
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Input change handler todo
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Submit form (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const payload = editId ? { id: editId, ...form } : form;

    await fetch("/api/users", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setForm({
      name: "",
      work: "",
      profession: "",
      location: "",
      mobile: "",
      email: "",
    });
    setEditId(null);
    fetchUsers();
  };

  // 🔹 Delete user
  const handleDelete = async (id) => {
    await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchUsers();
  };

  // 🔹 Edit user
  const handleEdit = (user) => {
    setForm({
      name: user.name,
      work: user.work,
      profession: user.profession,
      location: user.location,
      mobile: user.mobile,
      email: user.email,
    });
    setEditId(user._id);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📝 User Todo List</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3 mb-6">
        {["name", "work", "profession", "location", "mobile", "email"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.toUpperCase()}
            value={form[field]}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        ))}
        <button
          type="submit"
          className={`col-span-2 ${editId ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2 rounded`}
        >
          {editId ? "Update User" : "Add User"}
        </button>
      </form>

      <div>
        {users.map((u) => (
          <div
            key={u._id}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <p>
                <b>{u.name}</b> ({u.profession})
              </p>
              <p>
                {u.work} — {u.location}
              </p>
              <p>
                {u.mobile} | {u.email}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(u)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(u._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
