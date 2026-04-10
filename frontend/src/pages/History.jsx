import { useEffect, useState } from "react";
import { getHistory } from "../services/api";
import Navbar from "../components/Navbar";

export default function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      const res = await getHistory(token);
      setData(res.data);
    };
    fetchHistory();
  }, []);

  return (
    <div>
      <Navbar />
    <div className="p-6">
      <h2 className="text-2xl mb-4">History</h2>

      {data.map(item => (
        <div key={item.id} className="border p-4 mb-2 rounded">
          <img src={`http://127.0.0.1:8000${item.image}`} width="100"/>
          <p>{item.result}</p>
          <p>{(item.confidence * 100).toFixed(2)}%</p>
        </div>
      ))}
    </div>
    </div>
  );
}