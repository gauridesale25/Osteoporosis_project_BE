import { useState } from "react";
import { predictImage } from "../services/api";
import ResultCard from "../components/ResultCard";
import Navbar from "../components/Navbar";

export default function Upload() {
  const [patientName, setPatientName] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    
    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const handleUpload = async () => {
    if (!patientName.trim()) {
      alert("Please enter a patient name");
      return;
    }

    if (files.length === 0) {
      alert("Please select at least one image");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    setIsLoading(true);
    setResults([]);
    const newResults = [];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("patient_name", patientName);

        const res = await predictImage(formData, token);
        newResults.push({ ...res.data, fileName: file.name });
      }
      
      setResults(newResults);
    } catch (err) {
      console.error(err);

      if (err.response && err.response.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        alert("Error uploading images");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center p-6 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload X-ray Scans</h2>

          <div className="mb-6 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name *</label>
            <input 
              type="text" 
              placeholder="e.g., John Doe"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
              required
            />
          </div>

          <div className="border-2 border-dashed border-teal-300 rounded-xl p-8 mb-6 bg-teal-50 hover:bg-teal-100 transition">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-white file:text-teal-700 file:shadow-sm
                hover:file:bg-teal-50 cursor-pointer"
            />
          </div>

          {previews.length > 0 && (
            <div className="mb-6 text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">Selected Images ({previews.length})</label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {previews.map((src, index) => (
                  <img key={index} src={src} alt="Preview" className="h-16 w-16 object-cover rounded shadow-sm border border-gray-200 flex-shrink-0" />
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={isLoading || files.length === 0 || !patientName.trim()}
            className={`w-full text-white font-bold py-3 px-4 rounded-xl transition shadow-md flex items-center justify-center ${
              (isLoading || files.length === 0 || !patientName.trim()) ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              "Analyze Images"
            )}
          </button>
        </div>

        {results.length > 0 && (
          <div className="mt-8 w-full max-w-lg space-y-4">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Results for {patientName}</h3>
            {results.map((result, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4 border border-gray-100">
                <p className="font-semibold text-gray-700 mb-2">File: {result.fileName}</p>
                <ResultCard result={result} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}