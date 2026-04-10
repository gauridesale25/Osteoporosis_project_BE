import { useState } from "react";
import { predictImage } from "../services/api";
import ResultCard from "../components/ResultCard";
import Navbar from "../components/Navbar";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    try {
      if (!file) {
        alert("Please select an image first");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await predictImage(formData, token);

      setResult(res.data);

    } catch (err) {
      console.error(err);

      if (err.response && err.response.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        alert("Error uploading image");
      }
    }
  };

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl mb-4">Upload X-ray</h2>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={handleUpload}
          className="bg-green-500 text-white px-4 py-2 ml-2 rounded"
        >
          Analyze
        </button>

        {result && <ResultCard result={result} />}
      </div>
    </div>
  );
}