import { useState, useEffect } from "react";
import { loginUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const res = await loginUser(data);
      localStorage.setItem("token", res.data.access);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1 justify-center items-center px-4 py-12">
        <div className="p-8 shadow-xl rounded-2xl w-full max-w-md bg-white border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>

          {error && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 py-2 rounded">{error}</p>}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              placeholder="Enter your username"
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="Enter your password"
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>

          <button 
            onClick={handleLogin}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium w-full p-3 rounded-lg transition shadow-md"
          >
            Sign In
          </button>
          
          <p className="text-sm mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-teal-600 font-semibold hover:underline">
                Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}