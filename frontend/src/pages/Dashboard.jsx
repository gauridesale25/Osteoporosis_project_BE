import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4">
          Welcome to Osteoporosis Detection System
        </h2>

        <p className="text-gray-600 mb-6">
          Upload knee X-ray images to detect early signs of osteoporosis using AI.
        </p>

        <div className="grid grid-cols-3 gap-4">
          
          <div className="p-4 shadow rounded bg-white">
            <h3 className="font-semibold">Upload Scan</h3>
            <p className="text-sm text-gray-500">
              Analyze a new X-ray image
            </p>
          </div>

          <div className="p-4 shadow rounded bg-white">
            <h3 className="font-semibold">View History</h3>
            <p className="text-sm text-gray-500">
              Check past predictions
            </p>
          </div>

          <div className="p-4 shadow rounded bg-white">
            <h3 className="font-semibold">AI Insights</h3>
            <p className="text-sm text-gray-500">
              Get detailed probability analysis
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

