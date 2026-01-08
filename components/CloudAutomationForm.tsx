'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Cloud, 
  Globe, 
  Bell, 
  Clock, 
  Zap,
  Check,
  Loader2,
  ArrowRight,
  HelpCircle,
  Info
} from 'lucide-react';

interface CloudAutomationFormProps {
  automationType: string;
}

export default function CloudAutomationForm({ automationType }: CloudAutomationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    url: '',
    discord_webhook: '',
    email: '',
    css_selector: 'body',
    interval_minutes: 10  // Changed default to 10 minutes
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://agentic-automation-api.onrender.com';
      
      const response = await fetch(`${apiUrl}/api/hosted-automations/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          automation_type: automationType,
          name: formData.name,
          interval_minutes: formData.interval_minutes,
          config: {
            url: formData.url,
            discord_webhook: formData.discord_webhook,
            email: formData.email,
            css_selector: formData.css_selector
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to create automation');
      }

      setSuccess(true);
      
      setTimeout(() => {
        router.push('/hosted-automations');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Automation Created! 🎉
        </h2>
        <p className="text-gray-300 text-lg mb-2">
          Your automation is now running in the cloud
        </p>
        <p className="text-gray-400 text-sm mb-6">
          Redirecting to dashboard...
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
          <Cloud className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Cloud Automation Setup</h2>
          <p className="text-gray-400 text-sm">Runs automatically - no downloads needed</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Automation Name */}
      <div className="mb-6">
        <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
          Automation Name *
          <div className="group relative">
            <HelpCircle className="w-4 h-4 text-gray-500 cursor-help" />
            <div className="invisible group-hover:visible absolute left-0 top-6 bg-gray-800 text-white text-xs rounded-lg p-3 w-64 z-10 shadow-xl">
              Give your automation a memorable name so you can easily identify it in your dashboard
            </div>
          </div>
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="e.g., Monitor Bitcoin Price"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
        />
      </div>

      {/* Website URL */}
      <div className="mb-6">
        <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Website URL *
          <div className="group relative">
            <HelpCircle className="w-4 h-4 text-gray-500 cursor-help" />
            <div className="invisible group-hover:visible absolute left-0 top-6 bg-gray-800 text-white text-xs rounded-lg p-3 w-72 z-10 shadow-xl">
              <strong>What it does:</strong> The website you want to monitor for changes. Our system will visit this URL regularly and check if anything changed.
              <br/><br/>
              <strong>Examples:</strong><br/>
              • Product page: Track price changes<br/>
              • News site: Monitor new articles<br/>
              • GitHub repo: Watch for updates
            </div>
          </div>
        </label>
        <input
          type="url"
          required
          value={formData.url}
          onChange={(e) => setFormData({...formData, url: e.target.value})}
          placeholder="https://example.com/product"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
        />
        <p className="text-gray-500 text-xs mt-2 flex items-center gap-1">
          <Info className="w-3 h-3" />
          The complete URL including https://
        </p>
      </div>

      {/* CSS Selector with enhanced help */}
      <div className="mb-6">
        <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
          CSS Selector (Optional)
          <div className="group relative">
            <HelpCircle className="w-4 h-4 text-gray-500 cursor-help" />
            <div className="invisible group-hover:visible absolute left-0 top-6 bg-gray-800 text-white text-xs rounded-lg p-4 w-80 z-10 shadow-xl">
              <strong>What it does:</strong> Tells the system which part of the webpage to monitor. Think of it as pointing to a specific section.
              <br/><br/>
              <strong>Common examples:</strong><br/>
              • <code className="bg-gray-700 px-1 rounded">body</code> - Monitor entire page (default)<br/>
              • <code className="bg-gray-700 px-1 rounded">.price</code> - Monitor price elements<br/>
              • <code className="bg-gray-700 px-1 rounded">#product-title</code> - Monitor product name<br/>
              • <code className="bg-gray-700 px-1 rounded">.stock-status</code> - Monitor availability<br/>
              <br/>
              <strong>How to find it:</strong><br/>
              1. Right-click element on webpage<br/>
              2. Click "Inspect"<br/>
              3. Look for class="..." or id="..."
            </div>
          </div>
        </label>
        <input
          type="text"
          value={formData.css_selector}
          onChange={(e) => setFormData({...formData, css_selector: e.target.value})}
          placeholder="body"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all font-mono text-sm"
        />
        <div className="mt-2 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <p className="text-blue-300 text-xs font-semibold mb-1">💡 Pro Tip:</p>
          <p className="text-gray-400 text-xs">
            Leave as <code className="bg-white/10 px-1 rounded">body</code> to monitor the entire page. 
            Use specific selectors like <code className="bg-white/10 px-1 rounded">.price</code> to track only price changes and avoid false alerts.
          </p>
        </div>
      </div>

      {/* Check Interval */}
      <div className="mb-6">
        <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Check Interval *
          <div className="group relative">
            <HelpCircle className="w-4 h-4 text-gray-500 cursor-help" />
            <div className="invisible group-hover:visible absolute left-0 top-6 bg-gray-800 text-white text-xs rounded-lg p-3 w-72 z-10 shadow-xl">
              <strong>What it does:</strong> How often our system checks the website for changes.
              <br/><br/>
              <strong>Choose based on:</strong><br/>
              • Fast changes (prices, stocks): Every 10-30 min<br/>
              • News/updates: Every hour<br/>
              • Slow changes: Once daily<br/>
              <br/>
              ⚡ <strong>Demo mode:</strong> Actually checks every 10 seconds for quick testing!
            </div>
          </div>
        </label>
        <select
          value={formData.interval_minutes}
          onChange={(e) => setFormData({...formData, interval_minutes: parseInt(e.target.value)})}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
        >
          <option value={10}>Every 10 minutes (Demo: actually 10 sec)</option>
          <option value={30}>Every 30 minutes</option>
          <option value={60}>Every hour</option>
          <option value={180}>Every 3 hours</option>
          <option value={360}>Every 6 hours</option>
          <option value={720}>Every 12 hours</option>
          <option value={1440}>Once daily</option>
        </select>
        <div className="mt-2 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <p className="text-yellow-300 text-xs font-semibold mb-1">⚡ Demo Mode Active</p>
          <p className="text-gray-400 text-xs">
            For testing, automations run every <strong>10 seconds</strong> regardless of selected interval. 
            You'll see changes detected very quickly!
          </p>
        </div>
      </div>

      {/* Notifications */}
      <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-yellow-400" />
          <h3 className="text-white font-semibold">Notification Settings</h3>
          <div className="group relative">
            <HelpCircle className="w-4 h-4 text-gray-500 cursor-help" />
            <div className="invisible group-hover:visible absolute left-0 top-6 bg-gray-800 text-white text-xs rounded-lg p-3 w-72 z-10 shadow-xl">
              <strong>What it does:</strong> Choose where to receive instant alerts when changes are detected.
              <br/><br/>
              You need at least one notification method to know when something changed!
            </div>
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-4">Get alerted when changes are detected (at least one required)</p>
        
        {/* Discord Webhook */}
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-semibold mb-2">
            Discord Webhook URL ⚡ Recommended
          </label>
          <input
            type="url"
            value={formData.discord_webhook}
            onChange={(e) => setFormData({...formData, discord_webhook: e.target.value})}
            placeholder="https://discord.com/api/webhooks/..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all text-sm"
          />
          <div className="mt-2 flex items-start gap-2 text-xs text-gray-400">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <strong>How to get Discord webhook:</strong><br/>
              1. Open Discord → Go to your server<br/>
              2. Right-click a channel → Edit Channel<br/>
              3. Integrations → Webhooks → New Webhook<br/>
              4. Copy Webhook URL and paste above
            </div>
          </div>
          <a 
            href="https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks" 
            target="_blank"
            className="text-blue-400 text-xs hover:underline mt-2 inline-flex items-center gap-1"
          >
            📖 Detailed guide with screenshots →
          </a>
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-300 text-sm font-semibold mb-2">
            Email Address 📧 Coming Soon
          </label>
          <input
            type="email"
            disabled
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="your@email.com (coming soon)"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-500 placeholder-gray-600 cursor-not-allowed text-sm opacity-50"
          />
          <p className="text-gray-500 text-xs mt-2">Email notifications will be added soon. Use Discord for now!</p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !formData.discord_webhook}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Creating Automation...
          </>
        ) : (
          <>
            <Zap className="w-5 h-5" />
            Activate Cloud Automation
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      {!formData.discord_webhook && (
        <p className="text-yellow-400 text-sm text-center mt-3 flex items-center justify-center gap-2">
          <Bell className="w-4 h-4" />
          Please add a Discord webhook to receive notifications
        </p>
      )}

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <h4 className="text-blue-300 font-semibold text-sm mb-2 flex items-center gap-2">
          <Zap className="w-4 h-4" />
          What happens next?
        </h4>
        <ul className="text-gray-400 text-xs space-y-1.5">
          <li>✓ Your automation starts running immediately in our cloud</li>
          <li>✓ We check the website every 10 seconds (demo mode)</li>
          <li>✓ When changes detected → Instant Discord notification</li>
          <li>✓ View all activity in your dashboard anytime</li>
          <li>✓ Pause/resume/delete whenever you want</li>
        </ul>
      </div>
    </form>
  );
}
