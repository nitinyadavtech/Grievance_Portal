import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    nav("/login");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/20 backdrop-blur-lg shadow-md border-b border-white/30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center text-white">
        <h1 className="text-lg font-bold">🇮🇳 Grievance Portal</h1>

        {/* Desktop */}
        <div className="hidden md:flex space-x-6 items-center">
          {role !== "admin" && (
            <>
              <Link to="/home">Home</Link>
              <Link to="/track">Track</Link>
            </>
          )}

          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Mobile */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white/20 backdrop-blur-lg px-4 pb-4 space-y-2 text-white">
          {role !== "admin" && (
            <>
              <Link to="/home" onClick={() => setOpen(false)}>
                Home
              </Link>
              <Link to="/track" onClick={() => setOpen(false)}>
                Track
              </Link>
            </>
          )}

          <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
