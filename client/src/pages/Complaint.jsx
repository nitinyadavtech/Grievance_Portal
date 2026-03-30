import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import img from "../assets/img2.jpeg";

export default function Complaint() {
  const role = localStorage.getItem("role");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });

  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/complaints");
    setData(res.data);
  };

  useEffect(() => {
    if (role === "admin") {
      fetchData();
    }
  }, []);

  const submit = async () => {
    if (!form.title || !form.description) {
      return alert("Fill all fields");
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("location", form.location);

    if (form.image) {
      formData.append("image", form.image);
    }

    const res = await axios.post(
      "http://localhost:5000/api/complaints",
      formData,
    );

    alert("Complaint Registered ID: " + res.data.trackingId);

    setForm({ title: "", description: "", category: "" });
  };

  const update = async (id) => {
    if (!file) return alert("Upload proof first");

    const formData = new FormData();
    formData.append("status", "Resolved");
    formData.append("proof", file);

    try {
      await axios.put("http://localhost:5000/api/complaints/" + id, formData);
      alert("Resolved with proof");
      setFile(null);
      fetchData();
    } catch {
      alert("Error updating");
    }
  };

  // 👑 ADMIN VIEW
  if (role === "admin") {
    return (
      <>
        <Navbar />
        <div className="relative min-h-screen p-6 pt-20">
          <img
            src={img}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative">
            <h2 className="text-2xl font-bold mb-6 text-white">
              {data.length ? "All complaints" : "No complaints"}
            </h2>

            {data.map((c) => (
              <div
                key={c._id}
                className="bg-white/50 backdrop-blur-md rounded-xl shadow-lg p-5 mb-6"
              >
                <h3 className="font-bold text-xl mb-1 text-red-800">
                  {c.title}
                </h3>
                <p className="text-gray-800 mb-2">{c.description}</p>
                <p className="text-lg font-bold text-yellow-800">
                  Category: {c.category}
                </p>
                <p className="mt-2 font-medium text-lg">
                  Status:{" "}
                  <span
                    className={
                      c.status === "Resolved"
                        ? "text-green-800 font-bold"
                        : "text-red-700 font-bold"
                    }
                  >
                    {c.status}
                  </span>
                </p>

                {/* IMAGES */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {c.image && (
                    <img
                      src={`http://localhost:5000/uploads/${c.image}`}
                      className="w-full h-96 object-cover rounded-lg border"
                    />
                  )}

                  {c.status === "Resolved" && c.proof && (
                    <img
                      src={`http://localhost:5000/uploads/${c.proof}`}
                      className="w-full h-96 object-cover rounded-lg border-2 border-green-500"
                    />
                  )}
                </div>

                {/* ACTIONS */}
                {c.status !== "Resolved" && (
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="flex-1"
                    />

                    <button
                      onClick={() => update(c._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Resolve + Upload Proof
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  // 👤 USER VIEW
  return (
    <>
      <Navbar />

      <div className="relative min-h-screen flex items-center justify-center">
        <img
          src={img}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative bg-white/40 backdrop-blur-md p-6 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            Register Complaint
          </h2>

          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-2 border mb-3 rounded bg-white/50 outline-none border-gray-600"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-2 border mb-3 rounded bg-white/50 outline-none border-gray-600"
          />

          <input
            placeholder="Enter Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full p-2 border mb-3 rounded bg-white/50 outline-none border-gray-600"
          />

          <select
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full p-2 border mb-3 rounded bg-white/50 outline-none border-gray-600"
          >
            <option>Select Category</option>
            <option>Road</option>
            <option>Water</option>
            <option>Electricity</option>
            <option>Other</option>
          </select>

          <input
            type="file"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            className="mb-3"
          />

          <button
            onClick={submit}
            className="bg-green-800 text-white px-4 py-2 rounded w-full"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
