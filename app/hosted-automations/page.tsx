'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Play, 
  Pause, 
  Trash2, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Activity,
  TrendingUp
} from 'lucide-react';

interface HostedAutomation {
  id: number;
  automation_type: string;
  name: string;
  config: any;
  interval_minutes: number;
  is_active: boolean;
  last_run: string | null;
  created_at: string;
}

export default function HostedAutomationsPage() {
  const router = useRouter();
  const [automations, setAutomations] = useState<HostedAutomation[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ active: 0, total: 0, limit: 3 });

  useEffect(() => {
    fetchAutomations();
  }, []);

  const fetchAutomations = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hosted-automations/list`);
      const data = await response.json();
      setAutomations(data);
      
      const active = data.filter((a: HostedAutomation) => a.is_active).length;
      setStats({ active, total: data.length, limit: 3 });
    } catch (error) {
      console.error('Failed to fetch automations:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAutomation = async (id: number) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hosted-automations/${id}/toggle`, {
        method: 'PUT'
      });
      fetchAutomations();
    } catch (error) {
      console.error('Failed to toggle automation:', error);
    }
  };

  const deleteAutomation = async (id: number) => {
    if (!confirm('Are you sure you want to delete this automation?')) return;
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hosted-automations/${id}`, {
        method: 'DELETE'
      });
      fetchAutomations();
    } catch (error) {
      console.error('Failed to delete automation:', error);
    }
  };

  const formatInterval = (minutes: number) => {
    if (minutes < 60) return `Every ${minutes} minutes`;
    if (minutes === 60) return 'Every hour';
    if (minutes === 1440) return 'Daily';
    return `Every ${Math.floor(minutes / 60)} hours`;
  };

  const formatLastRun = (lastRun: string | null) => {
    if (!lastRun) return 'Never';
    const date = new Date(lastRun);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;
    return `${Math.floor(diffMins / 1440)} days ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Cloud Automations
          </h1>
          <p className="text-gray-300">
            Your automations run automatically in the cloud - no downloads needed
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Automations</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {stats.active}/{stats.limit}
                </p>
              </div>
              <Activity className="w-12 h-12 text-green-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Created</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.total}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-blue-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Available Slots</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {stats.limit - stats.total}
                </p>
              </div>
              <Plus className="w-12 h-12 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Create New Button */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/workflows?mode=hosted')}
            disabled={stats.total >= stats.limit}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Automation
            {stats.total >= stats.limit && ' (Limit Reached)'}
          </button>
        </div>

        {/* Automations List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="text-gray-300 mt-4">Loading automations...</p>
          </div>
        ) : automations.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-12 border border-white/20 text-center">
            <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No automations yet
            </h3>
            <p className="text-gray-300 mb-6">
              Create your first cloud automation to get started
            </p>
            <button
              onClick={() => router.push('/workflows?mode=hosted')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Create Automation
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {automations.map((automation) => (
              <div
                key={automation.id}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-purple-400/50 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {automation.name}
                    </h3>
                    <p className="text-sm text-gray-400 capitalize">
                      {automation.automation_type.replace('_', ' ')}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    automation.is_active 
                      ? 'bg-green-500/20 text-green-300' 
                      : 'bg-gray-500/20 text-gray-300'
                  }`}>
                    {automation.is_active ? 'Active' : 'Paused'}
                  </div>
                </div>

                {/* Config Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Clock className="w-4 h-4" />
                    {formatInterval(automation.interval_minutes)}
                  </div>
                  {automation.config.url && (
                    <div className="text-sm text-gray-400 truncate">
                      🔗 {automation.config.url}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    {automation.last_run ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Last run: {formatLastRun(automation.last_run)}
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                        Not executed yet
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-white/10">
                  <button
                    onClick={() => toggleAutomation(automation.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                      automation.is_active
                        ? 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30'
                        : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                    }`}
                  >
                    {automation.is_active ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Resume
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => router.push(`/hosted-automations/${automation.id}/history`)}
                    className="flex-1 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg font-semibold hover:bg-blue-500/30 transition-all"
                  >
                    View History
                  </button>
                  
                  <button
                    onClick={() => deleteAutomation(automation.id)}
                    className="bg-red-500/20 text-red-300 px-4 py-2 rounded-lg font-semibold hover:bg-red-500/30 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Free Tier Notice */}
        <div className="mt-8 bg-purple-500/10 backdrop-blur-lg rounded-xl p-6 border border-purple-400/30">
          <h4 className="text-lg font-semibold text-white mb-2">
            Free Tier Limits
          </h4>
          <ul className="text-gray-300 space-y-1 text-sm">
            <li>✓ Up to 3 active cloud automations</li>
            <li>✓ Minimum check interval: 10 minutes</li>
            <li>✓ Email and Discord notifications</li>
            <li>✓ 30 days execution history</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
