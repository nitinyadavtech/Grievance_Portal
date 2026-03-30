import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function Admin() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/complaints");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const update = async (id) => {
    try {
      await axios.put("http://localhost:5000/api/complaints/" + id, {
        status: "Resolved",
      });

      alert("✅ Marked as Resolved");

      // Refresh list
      fetchData();
    } catch {
      alert("❌ Error updating status");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h2>

        <div className="grid gap-4">
          {data.map((c) => (
            <div
              key={c._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold">{c.title}</h3>
              <p className="text-gray-600">{c.description}</p>

              {c.image && (
                <img
                  src={`http://localhost:5000/uploads/${c.image}`}
                  className="mt-3 rounded-lg w-full h-40 object-cover"
                />
              )}

              <p className="mt-2">
                Status:
                <span
                  className={`ml-2 px-2 py-1 rounded text-white ${
                    c.status === "Pending" ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {c.status}
                </span>
              </p>

              {c.status !== "Resolved" && (
                <button
                  onClick={() => update(c._id)}
                  className="bg-blue-600 text-white px-4 py-2 mt-3 rounded hover:bg-blue-700"
                >
                  Mark Resolved
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
