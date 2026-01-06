'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Sparkles, 
  Zap, 
  Globe, 
  Bell, 
  TrendingUp,
  DollarSign,
  ArrowRight,
  Clock,
  Shield,
  Code2
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [task, setTask] = useState('');

  const handleGetStarted = () => {
    if (task.trim()) {
      router.push(`/create?task=${encodeURIComponent(task)}`);
    } else {
      router.push('/create');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent truncate">
              Agentic Automation
            </Link>
            <div className="flex items-center gap-3 sm:gap-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-all hidden md:block text-sm sm:text-base">
                Home
              </Link>
              <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-all text-sm sm:text-base">
                <span className="hidden sm:inline">How It Works</span>
                <span className="sm:hidden">Help</span>
              </Link>
              <Link 
                href="/create" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg transition-all font-semibold text-sm sm:text-base"
              >
                Create
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-3 sm:px-4 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8">
            <Sparkles className="text-purple-400" size={16} />
            <span className="text-purple-300 font-semibold text-xs sm:text-sm">AI-Powered Automation Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
            Automate Anything with{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              AI Agents
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
            Monitor websites, track prices, get instant alerts. No coding required - just describe what you want!
          </p>

          {/* Search Bar - FIXED FOR MOBILE */}
          <div className="max-w-3xl mx-auto mb-6 sm:mb-8 px-3 sm:px-0">
            {/* Mobile Layout: Stacked */}
            <div className="md:hidden space-y-3">
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGetStarted()}
                placeholder="e.g., Monitor Bitcoin price and alert me..."
                className="w-full px-4 py-4 bg-gray-800/50 backdrop-blur-lg border-2 border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all text-base"
              />
              <button
                onClick={handleGetStarted}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-base"
              >
                Create Automation
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Desktop Layout: Side by Side */}
            <div className="hidden md:block relative">
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGetStarted()}
                placeholder="e.g., Monitor Bitcoin price and alert me on Discord when it drops..."
                className="w-full px-6 py-5 bg-gray-800/50 backdrop-blur-lg border-2 border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all text-lg pr-32"
              />
              <button
                onClick={handleGetStarted}
                className="absolute right-2 top-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2"
              >
                Create
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Quick Examples */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-12 sm:mb-16 px-3">
            {[
              "Track Amazon prices",
              "Monitor stock market",
              "Watch crypto prices",
              "Check website updates"
            ].map((example) => (
              <button
                key={example}
                onClick={() => setTask(example)}
                className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-purple-500/50 text-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all text-xs sm:text-sm"
              >
                {example}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto mb-12 sm:mb-20">
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-purple-400 mb-1 sm:mb-2">100%</div>
              <div className="text-gray-400 text-xs sm:text-base">Free Forever</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-purple-400 mb-1 sm:mb-2">5 min</div>
              <div className="text-gray-400 text-xs sm:text-base">Setup Time</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-purple-400 mb-1 sm:mb-2">24/7</div>
              <div className="text-gray-400 text-xs sm:text-base">Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 px-4">
            What Can You Automate?
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 px-4">
            From price tracking to website monitoring - automate anything!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: DollarSign,
              title: "Price Tracking",
              desc: "Monitor Amazon, Flipkart, or any e-commerce site. Get alerts when prices drop!",
              color: "from-green-400 to-emerald-600"
            },
            {
              icon: TrendingUp,
              title: "Stock Market",
              desc: "Track Indian stocks (NSE/BSE) in real-time. Never miss market movements!",
              color: "from-blue-400 to-cyan-600"
            },
            {
              icon: Globe,
              title: "Website Monitor",
              desc: "Get notified when any website updates. Perfect for news, blogs, or competitors!",
              color: "from-purple-400 to-pink-600"
            },
            {
              icon: Bell,
              title: "Crypto Alerts",
              desc: "Monitor cryptocurrency prices. Get instant alerts on price movements!",
              color: "from-yellow-400 to-orange-600"
            },
            {
              icon: Zap,
              title: "News Updates",
              desc: "Stay updated with Hacker News, Reddit, or any news source automatically!",
              color: "from-red-400 to-pink-600"
            },
            {
              icon: Shield,
              title: "Uptime Monitoring",
              desc: "Monitor your websites, APIs, or services. Get uptime alerts instantly!",
              color: "from-indigo-400 to-purple-600"
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700 hover:border-purple-500/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              <div className={`inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-3 sm:mb-4`}>
                <feature.icon size={28} className="text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Preview */}
      <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-20">
        <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg border border-purple-500/30 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
            Simple 3-Step Process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {[
              { num: "1", title: "Describe", desc: "Tell us what you want to automate" },
              { num: "2", title: "Generate", desc: "AI creates production-ready code" },
              { num: "3", title: "Run", desc: "Download and execute your automation" }
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-purple-400 mb-2 sm:mb-3">{step.num}</div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{step.title}</h3>
                <p className="text-sm sm:text-base text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold text-base sm:text-lg transition-all"
          >
            Learn More
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
            Powered by AI
          </h2>
          <p className="text-lg sm:text-xl text-gray-400">
            Built with cutting-edge technology
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 max-w-4xl mx-auto">
          {[
            { name: "Python", icon: Code2 },
            { name: "FastAPI", icon: Zap },
            { name: "Next.js", icon: Globe },
            { name: "AI Agents", icon: Sparkles }
          ].map((tech) => (
            <div
              key={tech.name}
              className="bg-gray-800/50 border border-gray-700 rounded-lg sm:rounded-xl px-6 sm:px-8 py-3 sm:py-4 flex items-center gap-2 sm:gap-3"
            >
              <tech.icon size={20} className="text-purple-400" />
              <span className="text-white font-semibold text-base sm:text-lg">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-20">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Automate?
          </h2>
          <p className="text-base sm:text-xl text-purple-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Create your first automation in under 5 minutes. No credit card required!
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-purple-600 font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-xl transition-all transform hover:scale-105 text-base sm:text-lg"
          >
            <Sparkles size={24} />
            Start Building Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 text-center text-gray-400">
          <p className="mb-2 text-xs sm:text-sm">© 2026 Agentic Automation Platform. Built with ❤️ by Sivakumar Balaji</p>
          <div className="flex justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <Link href="/how-it-works" className="hover:text-purple-400 transition-all">
              How It Works
            </Link>
            <Link href="/create" className="hover:text-purple-400 transition-all">
              Create Automation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
