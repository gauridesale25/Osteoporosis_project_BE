import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center bg-white shadow-sm px-8 py-4 border-b border-gray-100">
      <Link to="/" className="text-xl font-bold text-teal-600 tracking-tight hover:text-teal-700 transition">
        Osteoporosis AI
      </Link>

      <div className="flex gap-6 items-center font-medium text-sm">
        <Link to="/" className="text-gray-600 hover:text-teal-600 transition">Dashboard</Link>
        <Link to="/upload" className="text-gray-600 hover:text-teal-600 transition">Upload</Link>
        <Link to="/history" className="text-gray-600 hover:text-teal-600 transition">History</Link>

        {token ? (
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition font-semibold"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-3 ml-4">
            <Link to="/login" className="text-teal-600 border border-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition font-semibold">
              Login
            </Link>
            <Link to="/register" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition font-semibold shadow-sm">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}