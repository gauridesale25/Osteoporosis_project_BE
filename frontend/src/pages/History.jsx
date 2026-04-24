import { useEffect, useState } from "react";
import { getHistory } from "../services/api";
import Navbar from "../components/Navbar";

export default function History() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await getHistory(token);
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const groupedData = data.reduce((acc, item) => {
    const name = item.patient_name || "Unknown Patient";
    if (!acc[name]) acc[name] = [];
    acc[name].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-6xl mx-auto w-full p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Patient Analysis History</h2>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No history yet</h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              You haven't uploaded any X-ray images for analysis. Head over to the Upload page to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedData).map(([patientName, records]) => (
              <div key={patientName} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-teal-50 px-6 py-4 border-b border-teal-100 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-teal-800 flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    {patientName}
                  </h3>
                  <span className="text-sm font-medium text-teal-600 bg-teal-100 px-3 py-1 rounded-full">
                    {records.length} Scan{records.length > 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {records.map(item => (
                      <div key={item.id} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition flex flex-col">
                        <div className="h-40 bg-gray-200 w-full overflow-hidden flex items-center justify-center">
                          <img src={`http://127.0.0.1:8000${item.image}`} alt="X-ray" className="object-cover w-full h-full" />
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <span className="font-bold text-gray-800">{item.result}</span>
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              item.confidence > 0.8 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {(item.confidence * 100).toFixed(1)}% Conf
                            </span>
                          </div>
                          {item.date && (
                            <p className="text-xs text-gray-500 mt-auto">
                              {new Date(item.date).toLocaleDateString()} {new Date(item.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}