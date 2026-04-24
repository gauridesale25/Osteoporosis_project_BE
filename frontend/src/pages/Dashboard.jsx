import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-teal-600 text-white py-16 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight max-w-4xl mx-auto">
          AI-Powered Osteoporosis Detection
        </h2>
        <p className="text-lg md:text-xl text-teal-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload your knee X-ray images and let our advanced AI model detect early signs of osteoporosis with high accuracy in seconds.
        </p>
        <Link 
          to="/upload" 
          className="bg-white text-teal-700 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1 inline-block text-lg"
        >
          Start Analysis Now
        </Link>
      </div>

      {/* Features/Action Cards */}
      <div className="flex-1 max-w-6xl mx-auto w-full p-8 py-16">
        <h3 className="text-3xl font-bold text-gray-800 mb-10 text-center">How It Works</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 shadow-md rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-shadow flex flex-col items-center text-center">
            <div className="bg-teal-100 text-teal-600 p-5 rounded-full mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">1. Upload Scan</h3>
            <p className="text-gray-600 leading-relaxed">
              Securely upload your clear knee X-ray image for instant, private analysis by our system.
            </p>
          </div>

          <div className="p-8 shadow-md rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-shadow flex flex-col items-center text-center">
             <div className="bg-teal-100 text-teal-600 p-5 rounded-full mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">2. View History</h3>
            <p className="text-gray-600 leading-relaxed">
              Access and manage all your past predictions securely in one convenient place.
            </p>
          </div>

          <div className="p-8 shadow-md rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-shadow flex flex-col items-center text-center">
            <div className="bg-teal-100 text-teal-600 p-5 rounded-full mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">3. AI Insights</h3>
            <p className="text-gray-600 leading-relaxed">
              Receive detailed probability analysis and confidence scores directly from our AI.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
