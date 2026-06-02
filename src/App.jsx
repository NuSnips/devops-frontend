import React, { useState, useEffect } from "react";

export default function App() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch time from the API
  const fetchTime = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/time");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTime(data.time);
      setDate(data.date);
    } catch (err) {
      setError("Could not connect to the backend server.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch time automatically when the component mounts
  useEffect(() => {
    fetchTime();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center font-sans">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl max-w-sm w-full border border-slate-700 text-center">
        <h1 className="text-xl font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Server Clock
        </h1>

        <div className="h-24 flex items-center justify-center my-6">
          {loading ? (
            <div className="animate-pulse text-2xl text-blue-400">
              Fetching time...
            </div>
          ) : error ? (
            <div className="text-red-400 text-sm">{error}</div>
          ) : (
            <div className="text-2xl font-mono font-bold text-emerald-400 tracking-tight">
              {date} - {time}
            </div>
          )}
        </div>

        <button
          onClick={fetchTime}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-medium py-3 px-4 rounded-xl transition duration-200 shadow-lg shadow-blue-600/20 active:scale-[0.98]"
        >
          {loading ? "Refreshing..." : "Refresh Time"}
        </button>
      </div>
    </div>
  );
}
