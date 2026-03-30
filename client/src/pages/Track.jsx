import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import img from "../assets/img2.jpeg";

export default function Track() {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);

  const search = async () => {
    try {
      const res = await axios.get(
        "http://https://grievance-portal-backend-atde.onrender.com/api/complaints/" +
          id,
      );
      setData(res.data);
    } catch {
      alert("Not found");
    }
  };

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen flex justify-center items-center px-4 pt-20 pb-20 overflow-y-auto">
        <img
          src={img}
          className="fixed inset-0 w-full h-full object-cover -z-10"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative bg-white/50 backdrop-blur-md rounded-xl shadow-xl w-full max-w-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-center text-gray-900">
            Track Complaint
          </h2>

          <input
            placeholder="Enter Tracking ID"
            onChange={(e) => setId(e.target.value)}
            className="w-full p-2 border rounded mb-3 outline-none bg-white/50 border-gray-600"
          />

          <button
            onClick={search}
            className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-600"
          >
            Track
          </button>

          {data && (
            <div className="mt-6 border-t pt-4">
              <h3 className="font-bold text-xl">{data.title}</h3>
              <p className="text-gray-700">{data.description}</p>

              <p className="mt-2 font-bold text-yellow-800">
                Category: {data.category}
              </p>

              {/* USER IMAGE */}
              {data.image && (
                <div className="mt-4">
                  <p className="font-semibold text-sm">Uploaded Image:</p>
                  <img
                    src={`http://https://grievance-portal-backend-atde.onrender.com/uploads/${data.image}`}
                    className="mt-2 rounded-lg border border-green-900"
                  />
                </div>
              )}

              <p className="mt-4 font-bold text-lg">
                Status:{" "}
                <span
                  className={
                    data.status === "Resolved"
                      ? "text-green-800"
                      : "text-red-800"
                  }
                >
                  {data.status}
                </span>
              </p>

              {/* ✅ ADMIN PROOF */}
              {data.status === "Resolved" && data.proof && (
                <div className="mt-4">
                  <p className="font-semibold text-gray-600">
                    Resolution Proof:
                  </p>
                  <img
                    src={`http://https://grievance-portal-backend-atde.onrender.com/uploads/${data.proof}`}
                    className="mt-2 rounded-lg border border-green-900"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
