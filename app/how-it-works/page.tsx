'use client';

import { 
  Download, 
  Code, 
  Zap, 
  Cloud,
  Globe,
  Bell,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            How It Works
          </h1>
          <p className="text-gray-300 text-xl">
            Two ways to automate - choose what works best for you
          </p>
        </div>

        {/* Two Modes Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Cloud Automations */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Cloud className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Cloud Mode</h2>
                <p className="text-blue-300">No coding needed</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6">
              Perfect for non-technical users. Your automations run 24/7 in our cloud - no downloads, no setup, just results.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Runs automatically 24/7</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No downloads required</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Instant Discord & email alerts</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>2-minute setup</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <p className="text-blue-300 text-sm font-semibold">Free Tier: 3 automations</p>
            </div>
          </div>

          {/* Download Script Mode */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Download className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Download Mode</h2>
                <p className="text-purple-300">For developers</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6">
              Get a ready-to-run Python script. Full control, unlimited customization, run on your own machine.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Download Python script</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Run on your machine</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Full customization</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Unlimited automations</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <p className="text-purple-300 text-sm font-semibold">100% Free Forever</p>
            </div>
          </div>
        </div>

        {/* Cloud Automations - Step by Step */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Cloud className="w-8 h-8 text-blue-400" />
            <h2 className="text-3xl font-bold text-white">Cloud Automations - Step by Step</h2>
          </div>
          
          <div className="space-y-6">
            
            {/* Step 1 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-blue-400">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-400" />
                  Choose What to Monitor
                </h3>
                <p className="text-gray-300 mb-3">
                  Enter the website URL you want to track. You can monitor:
                </p>
                <ul className="text-gray-400 space-y-1 text-sm">
                  <li>• <strong>Product prices</strong> - Get alerts when prices drop</li>
                  <li>• <strong>Stock availability</strong> - Know when items are back in stock</li>
                  <li>• <strong>Website changes</strong> - Track any content updates</li>
                  <li>• <strong>GitHub repos</strong> - Monitor stars, issues, or commits</li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-blue-400">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-400" />
                  Target Specific Content (Optional)
                </h3>
                <p className="text-gray-300 mb-3">
                  Use CSS selectors to monitor specific parts of a page:
                </p>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-gray-400 text-sm mb-2"><strong>Examples:</strong></p>
                  <ul className="text-gray-400 space-y-1 text-sm font-mono">
                    <li>• <code className="text-blue-300">.price</code> - Monitor price changes only</li>
                    <li>• <code className="text-blue-300">#stock-status</code> - Track availability</li>
                    <li>• <code className="text-blue-300">body</code> - Monitor entire page (default)</li>
                  </ul>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  💡 Tip: Leave as "body" if you're not sure - it monitors everything
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-blue-400">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  Set Check Interval
                </h3>
                <p className="text-gray-300 mb-3">
                  Choose how often to check for changes:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-slate-800/50 rounded p-3 border border-slate-700">
                    <p className="text-blue-300 font-semibold">Every 10 min</p>
                    <p className="text-gray-500 text-xs">Fast changes</p>
                  </div>
                  <div className="bg-slate-800/50 rounded p-3 border border-slate-700">
                    <p className="text-blue-300 font-semibold">Every hour</p>
                    <p className="text-gray-500 text-xs">Regular updates</p>
                  </div>
                  <div className="bg-slate-800/50 rounded p-3 border border-slate-700">
                    <p className="text-blue-300 font-semibold">Daily</p>
                    <p className="text-gray-500 text-xs">Slow changes</p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <p className="text-yellow-300 text-sm">
                    ⚡ Demo mode: Automations run every 10 seconds for quick testing!
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-blue-400">4</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-400" />
                  Setup Notifications
                </h3>
                <p className="text-gray-300 mb-3">
                  Get instant alerts when changes are detected:
                </p>
                
                {/* Discord */}
                <div className="mb-4 p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  <h4 className="text-indigo-300 font-semibold mb-2">Discord (Recommended) 💬</h4>
                  <ol className="text-gray-400 text-sm space-y-1 ml-4">
                    <li>1. Open Discord → Go to your server</li>
                    <li>2. Right-click a channel → Edit Channel</li>
                    <li>3. Integrations → Webhooks → New Webhook</li>
                    <li>4. Copy Webhook URL and paste in the form</li>
                  </ol>
                </div>

                {/* Email */}
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="text-blue-300 font-semibold mb-2">Email 📧</h4>
                  <p className="text-gray-400 text-sm">
                    Simply enter your email address. You'll receive beautiful HTML email alerts with full details of what changed.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 flex items-start gap-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  Activate & Relax! 🎉
                </h3>
                <p className="text-gray-300 mb-3">
                  Click "Activate Cloud Automation" and you're done! Your automation:
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Starts running immediately in our cloud servers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Checks your website at the interval you set</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Sends instant notifications when changes detected</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Logs all activity in your dashboard</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Download Mode Quick Guide */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Download className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold text-white">Download Mode - Quick Guide</h2>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-400">1</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Describe</h3>
                <p className="text-gray-400 text-sm">
                  Tell our AI what you want to automate in plain English
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-400">2</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Download</h3>
                <p className="text-gray-400 text-sm">
                  Get a ready-to-run Python script tailored to your needs
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-400">3</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Run</h3>
                <p className="text-gray-400 text-sm">
                  Execute the script on your machine - full control!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Popular Use Cases</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-white font-bold mb-2">Price Tracking</h3>
              <p className="text-gray-400 text-sm">
                Monitor Amazon, Flipkart, or any e-commerce site. Get alerts when prices drop below your target.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-3">📦</div>
              <h3 className="text-white font-bold mb-2">Stock Alerts</h3>
              <p className="text-gray-400 text-sm">
                Track product availability. Know instantly when out-of-stock items are back.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="text-white font-bold mb-2">GitHub Monitoring</h3>
              <p className="text-gray-400 text-sm">
                Watch your repos for stars, forks, issues, or new commits.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-3">📰</div>
              <h3 className="text-white font-bold mb-2">News Updates</h3>
              <p className="text-gray-400 text-sm">
                Monitor news sites, blogs, or RSS feeds for new articles on topics you care about.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-white font-bold mb-2">Job Postings</h3>
              <p className="text-gray-400 text-sm">
                Track job boards for new openings matching your skills. Never miss an opportunity.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-3">🏠</div>
              <h3 className="text-white font-bold mb-2">Real Estate</h3>
              <p className="text-gray-400 text-sm">
                Monitor property listings for new homes in your area and price range.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-12 border border-purple-500/30">
          <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Automate?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join users who are saving hours every week with automated monitoring. 
            No credit card required. Start in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/create"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
            >
              <Cloud className="w-5 h-5" />
              Start Cloud Automation
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/hosted-automations"
              className="bg-white/10 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
            >
              View Dashboard
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
