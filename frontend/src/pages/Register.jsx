import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Register() {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUser({
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        password: data.password
      });

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Try different username.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1 justify-center items-center px-4 py-12">
        <div className="p-8 shadow-xl rounded-2xl w-full max-w-md bg-white border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>

          {error && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 py-2 rounded">{error}</p>}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                placeholder="John"
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                onChange={(e) => setData({ ...data, first_name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                placeholder="Doe"
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                onChange={(e) => setData({ ...data, last_name: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              placeholder="Choose a username"
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
              onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
            />
          </div>

          <button
            onClick={handleRegister}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium w-full p-3 rounded-lg transition shadow-md"
          >
            Register
          </button>

          <p className="text-sm mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-600 font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}