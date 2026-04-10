import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-gray-800 text-white px-6 py-3">
      
      <h1 className="text-lg font-semibold">
        Osteoporosis AI
      </h1>

      <div className="flex gap-4 items-center">
        <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/upload" className="hover:text-gray-300">Upload</Link>
        <Link to="/history" className="hover:text-gray-300">History</Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}