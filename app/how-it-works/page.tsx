'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Brain, 
  Code, 
  Download, 
  Play, 
  Bell,
  ArrowRight,
  Check
} from 'lucide-react';

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            How It Works
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Create powerful automations in minutes with AI. No coding required - just describe what you want!
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-5 gap-8 mb-20">
          {[
            { icon: Sparkles, title: "Describe", desc: "Tell us what you want to automate" },
            { icon: Brain, title: "AI Plans", desc: "AI designs the workflow automatically" },
            { icon: Code, title: "Code Gen", desc: "Production-ready Python code generated" },
            { icon: Download, title: "Download", desc: "Get your automation script" },
            { icon: Play, title: "Run", desc: "Execute and enjoy automation!" }
          ].map((step, idx) => (
            <div key={idx} className="relative">
              <div className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all hover:scale-105">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon size={32} />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-300 mb-2">
                    {idx + 1}
                  </div>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.desc}</p>
                </div>
              </div>
              {idx < 4 && (
                <ArrowRight 
                  className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-purple-400" 
                  size={24} 
                />
              )}
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {['overview', 'installation', 'examples'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'installation' && <InstallationTab />}
          {activeTab === 'examples' && <ExamplesTab />}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link 
            href="/create"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 text-lg"
          >
            <Sparkles size={24} />
            Create Your First Automation
          </Link>
        </div>
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">What Can You Automate?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "🛒 Price Tracking",
              desc: "Monitor Amazon, Flipkart, or any e-commerce site. Get alerts when prices drop!",
              example: "Track iPhone price, notify when below ₹50,000"
            },
            {
              title: "📈 Stock Monitoring",
              desc: "Track Indian stocks (NSE/BSE) in real-time. Never miss market movements!",
              example: "Monitor TCS, Reliance, Infosys stock prices"
            },
            {
              title: "🌐 Website Changes",
              desc: "Get notified when any website updates. Perfect for news, blogs, or competitors!",
              example: "Track competitor's product page for changes"
            },
            {
              title: "💰 Crypto Alerts",
              desc: "Monitor cryptocurrency prices. Get instant alerts on price movements!",
              example: "Alert when Bitcoin moves ₹10,000"
            },
            {
              title: "📰 News Updates",
              desc: "Stay updated with Hacker News, Reddit, or any news source automatically!",
              example: "Notify when new posts on r/programming"
            },
            {
              title: "⚡ System Monitoring",
              desc: "Monitor your websites, APIs, or services. Get uptime alerts instantly!",
              example: "Alert if my website goes down"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 mb-3">{item.desc}</p>
              <div className="bg-purple-900/30 border border-purple-500/30 rounded p-3 text-sm">
                <span className="text-purple-400">Example:</span> {item.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InstallationTab() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-6">How to Run Your Automation</h2>
        
        {/* Step 1 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">1</div>
            <h3 className="text-2xl font-bold">Download Your Script</h3>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 ml-13">
            <p className="mb-4">After generating your automation, click the "Download Script" button. You'll get a file named <code className="bg-purple-900/50 px-2 py-1 rounded">automation.py</code></p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">2</div>
            <h3 className="text-2xl font-bold">Install Python (If Not Already)</h3>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 ml-13">
            <p className="mb-4">Make sure you have Python 3.7+ installed:</p>
            <div className="bg-black p-4 rounded font-mono text-sm mb-4">
              <div className="text-gray-500"># Check Python version</div>
              <div className="text-green-400">python --version</div>
              <div className="text-gray-500 mt-2"># Or</div>
              <div className="text-green-400">python3 --version</div>
            </div>
            <p className="text-sm text-gray-400">
              Don't have Python? Download from <a href="https://python.org" target="_blank" className="text-purple-400 hover:text-purple-300">python.org</a>
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">3</div>
            <h3 className="text-2xl font-bold">Install Dependencies</h3>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 ml-13">
            <p className="mb-4">Open terminal/command prompt and run:</p>
            <div className="bg-black p-4 rounded font-mono text-sm">
              <div className="text-green-400">pip install requests beautifulsoup4 urllib3</div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              This installs the required libraries (only needed once!)
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">4</div>
            <h3 className="text-2xl font-bold">Run Your Automation</h3>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 ml-13">
            <p className="mb-4">Navigate to your script folder and run:</p>
            <div className="bg-black p-4 rounded font-mono text-sm mb-4">
              <div className="text-gray-500"># Change to your download folder</div>
              <div className="text-green-400">cd Downloads</div>
              <div className="text-gray-500 mt-2"># Run the automation</div>
              <div className="text-green-400">python automation.py</div>
            </div>
            <div className="bg-green-900/30 border border-green-500/30 rounded p-4">
              <div className="flex items-start gap-2">
                <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-green-400 mb-1">Success!</p>
                  <p className="text-sm">Your automation is now running! Check Discord for notifications.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Optional Step */}
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Bell size={24} className="text-purple-400" />
            Pro Tip: Run 24/7
          </h3>
          <p className="text-gray-300 mb-4">
            To keep your automation running continuously in the background:
          </p>
          <div className="bg-black p-4 rounded font-mono text-sm">
            <div className="text-gray-500"># Windows - Run in background</div>
            <div className="text-green-400">pythonw automation.py</div>
            <div className="text-gray-500 mt-2"># Linux/Mac - Run in background</div>
            <div className="text-green-400">nohup python automation.py &</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExamplesTab() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-6">Real-World Examples</h2>

      {[
        {
          title: "Track iPhone Price on Amazon",
          prompt: "Monitor iPhone 15 price on Amazon and alert me when it drops below ₹50,000",
          config: {
            type: "Price Tracker",
            url: "https://www.amazon.in/dp/B0CHX1W1XY",
            target: "₹50,000",
            webhook: "Your Discord webhook"
          },
          result: "Get instant Discord notifications when price drops!"
        },
        {
          title: "Monitor Bitcoin Price",
          prompt: "Track Bitcoin price in INR and notify me every time it changes",
          config: {
            type: "Website Monitor",
            url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr",
            interval: "60 seconds",
            webhook: "Your Discord webhook"
          },
          result: "Real-time crypto price alerts straight to Discord!"
        },
        {
          title: "Track Hacker News",
          prompt: "Monitor Hacker News front page and notify me when top story changes",
          config: {
            type: "Website Monitor",
            url: "https://news.ycombinator.com",
            selector: ".titleline",
            interval: "5 minutes",
            webhook: "Your Discord webhook"
          },
          result: "Never miss trending tech news!"
        },
        {
          title: "Monitor Your Website Uptime",
          prompt: "Check if my website is up every 5 minutes and alert if it goes down",
          config: {
            type: "Website Monitor",
            url: "https://your-website.com",
            interval: "300 seconds",
            webhook: "Your Discord webhook"
          },
          result: "Know immediately if your site goes down!"
        }
      ].map((example, idx) => (
        <div key={idx} className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-purple-400">{example.title}</h3>
          
          <div className="mb-4">
            <div className="text-sm text-gray-400 mb-2">Enter this prompt:</div>
            <div className="bg-purple-900/30 border border-purple-500/30 rounded p-4">
              "{example.prompt}"
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-gray-400 mb-2">Configuration:</div>
            <div className="bg-black rounded p-4 space-y-2 font-mono text-sm">
              {Object.entries(example.config).map(([key, value]) => (
                <div key={key}>
                  <span className="text-purple-400">{key}:</span> {value}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-900/30 border border-green-500/30 rounded p-4 flex items-center gap-2">
            <Check className="text-green-400" size={20} />
            <span className="text-green-400">{example.result}</span>
          </div>
        </div>
      ))}

      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to Build Yours?</h3>
        <p className="text-gray-300 mb-6">
          Start creating powerful automations in minutes!
        </p>
        <Link 
          href="/create"
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all"
        >
          <Sparkles size={20} />
          Create Automation Now
        </Link>
      </div>
    </div>
  );
}
