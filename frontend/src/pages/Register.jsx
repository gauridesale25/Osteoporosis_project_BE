import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Basic validation
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUser({
        username: data.username,
        password: data.password
      });

      alert("Registration successful! Please login.");
      navigate("/");
    } catch (err) {
      setError("Registration failed. Try different username.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-50">
      <div className="p-6 shadow-lg rounded-lg w-80 bg-white">
        
        <h2 className="text-xl font-bold mb-4 text-center">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <input
          placeholder="First Name"
          className="border p-2 w-full mb-2 rounded"
          onChange={(e) =>
            setData({ ...data, first_name: e.target.value })
          }
        />

        <input
          placeholder="Last Name"
          className="border p-2 w-full mb-2 rounded"
          onChange={(e) =>
            setData({ ...data, last_name: e.target.value })
          }
        />

        <input
          placeholder="Username"
          className="border p-2 w-full mb-2 rounded"
          onChange={(e) =>
            setData({ ...data, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2 rounded"
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
        />

        <button
          onClick={handleRegister}
          className="bg-green-500 text-white w-full p-2 rounded hover:bg-green-600 transition"
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}