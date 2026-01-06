'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap, Code, Rocket, ArrowRight } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [taskInput, setTaskInput] = useState('');

  const handleGetStarted = () => {
    if (taskInput) {
      router.push(`/create?task=${encodeURIComponent(taskInput)}`);
    } else {
      router.push('/create');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-white mb-6">
            Agentic Automation
            <span className="text-purple-400"> Platform</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Describe any task you want to automate. Our AI agents design the workflow,
            generate the code, and deploy it—all using free resources.
          </p>

          {/* Task Input */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <textarea
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="e.g., Monitor my website for changes and notify me on Discord every 30 minutes"
                className="w-full h-32 bg-white/5 text-white border border-purple-400/30 rounded-lg p-4 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleGetStarted}
                className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold 
                         py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition"
              >
                Create Automation <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={<Zap className="text-yellow-400" size={40} />}
              title="AI-Powered Design"
              description="Our agents analyze your task and design the optimal workflow automatically"
            />
            <FeatureCard
              icon={<Code className="text-green-400" size={40} />}
              title="Code Generation"
              description="Get production-ready Python code that you can run immediately"
            />
            <FeatureCard
              icon={<Rocket className="text-blue-400" size={40} />}
              title="Free Resources"
              description="Uses only free APIs and services—no hidden costs"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/5 backdrop-blur-md border border-purple-400/20 rounded-lg p-6"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
}
