'use client';

import { useState } from 'react';

export default function Backend2Button() {
  const [timestamp, setTimestamp] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('api2/data');
      const data = await response.json();
      console.log(data);
    
      setTimestamp(new Date(data.timestamp).toLocaleString());
    } catch (error) {
      console.error('Error fetching data:', error);
      setTimestamp('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={fetchData}
        disabled={loading}
        className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl shadow-lg hover:bg-indigo-50 transition disabled:opacity-50"
      >
        {loading ? 'Ładowanie...' : 'Pobierz datę z Backend2 ⏰'}
      </button>
      {timestamp && (
        <p className="text-lg bg-white/10 px-4 py-2 rounded-lg">
          Ostatnia data: {timestamp}
        </p>
      )}
    </div>
  );
} 