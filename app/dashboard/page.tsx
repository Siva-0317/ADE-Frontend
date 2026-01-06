'use client';

import { useState, useEffect } from 'react';
import { automationsAPI } from '@/lib/api';

export default function Dashboard() {
  const [automations, setAutomations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAutomations();
  }, []);

  const fetchAutomations = async () => {
    try {
      const response = await automationsAPI.list();
      setAutomations(response.data);
    } catch (error) {
      console.error('Failed to fetch:', error);
      // For MVP without auth, show empty state
      setAutomations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading automations...</p>
          </div>
        ) : automations.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <div className="text-6xl mb-4">🤖</div>
            <h2 className="text-2xl font-bold mb-2">No Automations Yet</h2>
            <p className="text-gray-400 mb-6">Create your first automation to get started!</p>
            <a
              href="/create"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Create Automation
            </a>
          </div>
        ) : (
          <div className="grid gap-4">
            {automations.map((auto: any) => (
              <div key={auto.id} className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">{auto.name}</h3>
                <p className="text-gray-400">{auto.description}</p>
                <div className="mt-4 flex gap-2">
                  <span className="bg-purple-600 px-3 py-1 rounded text-sm">
                    {auto.type}
                  </span>
                  <span className="bg-green-600 px-3 py-1 rounded text-sm">
                    {auto.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
