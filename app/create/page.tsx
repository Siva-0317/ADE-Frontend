'use client';

import { useState } from 'react';
import { Download, Cloud, Code, Zap, ArrowRight } from 'lucide-react';
import CloudAutomationForm from '@/components/CloudAutomationForm';
import Link from 'next/link';

export default function CreatePage() {
  const [mode, setMode] = useState<'download' | 'cloud'>('cloud');
  const [automationType, setAutomationType] = useState('website_monitor');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Create Your Automation
          </h1>
          <p className="text-gray-300 text-lg">
            Choose how you want to run your automation
          </p>
        </div>

        {/* Mode Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Cloud Mode */}
          <button
            onClick={() => setMode('cloud')}
            className={`p-6 rounded-2xl border-2 transition-all text-left ${
              mode === 'cloud'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-white/20 bg-white/5 hover:border-white/30'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                mode === 'cloud' ? 'bg-blue-500/20' : 'bg-white/10'
              }`}>
                <Cloud className={`w-6 h-6 ${mode === 'cloud' ? 'text-blue-400' : 'text-gray-400'}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Run in Cloud</h3>
                <p className="text-gray-400 text-sm">No coding needed</p>
              </div>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>✓ Runs 24/7 automatically</li>
              <li>✓ No downloads needed</li>
              <li>✓ Instant setup (2 min)</li>
              <li>✓ Free tier: 3 automations</li>
            </ul>
          </button>

          {/* Download Script Mode */}
          <button
            onClick={() => setMode('download')}
            className={`p-6 rounded-2xl border-2 transition-all text-left ${
              mode === 'download'
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-white/20 bg-white/5 hover:border-white/30'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                mode === 'download' ? 'bg-purple-500/20' : 'bg-white/10'
              }`}>
                <Download className={`w-6 h-6 ${mode === 'download' ? 'text-purple-400' : 'text-gray-400'}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Download Script</h3>
                <p className="text-gray-400 text-sm">For technical users</p>
              </div>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>✓ Download Python script</li>
              <li>✓ Run on your machine</li>
              <li>✓ Full customization</li>
              <li>✓ Unlimited automations</li>
            </ul>
          </button>
        </div>

        {/* Content Based on Mode */}
        {mode === 'cloud' ? (
          <>
            {/* Automation Type Selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Select Automation Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setAutomationType('website_monitor')}
                  className={`p-4 rounded-xl border transition-all ${
                    automationType === 'website_monitor'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-white/20 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <Code className={`w-8 h-8 mb-2 ${automationType === 'website_monitor' ? 'text-purple-400' : 'text-gray-400'}`} />
                  <h3 className="text-white font-semibold">Website Monitor</h3>
                  <p className="text-gray-400 text-sm">Track changes</p>
                </button>

                <button
                  onClick={() => setAutomationType('price_tracker')}
                  className={`p-4 rounded-xl border transition-all ${
                    automationType === 'price_tracker'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-white/20 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <Zap className={`w-8 h-8 mb-2 ${automationType === 'price_tracker' ? 'text-purple-400' : 'text-gray-400'}`} />
                  <h3 className="text-white font-semibold">Price Tracker</h3>
                  <p className="text-gray-400 text-sm">Monitor prices</p>
                </button>

                <button
                  disabled
                  className="p-4 rounded-xl border border-white/20 bg-white/5 opacity-50 cursor-not-allowed"
                >
                  <Code className="w-8 h-8 mb-2 text-gray-400" />
                  <h3 className="text-white font-semibold">More Soon</h3>
                  <p className="text-gray-400 text-sm">Coming soon</p>
                </button>
              </div>
            </div>

            {/* Cloud Automation Form */}
            <CloudAutomationForm automationType={automationType} />
          </>
        ) : (
          /* Download Mode - Redirect to Home/Workflow Designer */
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 text-center">
            <Download className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">
              Download Script Mode
            </h3>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              Describe what you want to automate in plain English. Our AI will generate a ready-to-run Python script tailored to your needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-3xl mb-2">💬</div>
                <h4 className="text-white font-semibold mb-1">1. Describe</h4>
                <p className="text-gray-400 text-sm">Tell us what you want to automate</p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="text-white font-semibold mb-1">2. Generate</h4>
                <p className="text-gray-400 text-sm">AI creates your custom script</p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-3xl mb-2">🚀</div>
                <h4 className="text-white font-semibold mb-1">3. Download</h4>
                <p className="text-gray-400 text-sm">Get ready-to-run Python code</p>
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Go to Workflow Designer
              <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="text-gray-500 text-sm mt-6">
              The workflow designer is on the homepage where you can describe your automation and download the script
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
