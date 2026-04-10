import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async () => {
    const res = await loginUser(data);
    localStorage.setItem("token", res.data.access);
    navigate("/dashboard");
  };

  return (
    <div><Navbar />
    <div className="flex h-screen justify-center items-center">
      <div className="p-6 shadow-lg rounded-lg w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input placeholder="Username"
          className="border p-2 w-full mb-2"
          onChange={(e)=>setData({...data, username:e.target.value})}
        />

        <input type="password" placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={(e)=>setData({...data, password:e.target.value})}
        />

        <button onClick={handleLogin}
          className="bg-blue-500 text-white w-full p-2 rounded">
          Login
        </button>
      <p className="text-sm mt-4 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 underline">
            Register
        </Link>
        </p>
      </div>
    </div>
    </div>
  );
}