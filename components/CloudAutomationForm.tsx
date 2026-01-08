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
  ArrowRight
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
    interval_minutes: 60
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
      
      // Redirect to hosted automations page after 2 seconds
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
        <label className="block text-gray-300 font-semibold mb-2">
          Automation Name *
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
        </label>
        <input
          type="url"
          required
          value={formData.url}
          onChange={(e) => setFormData({...formData, url: e.target.value})}
          placeholder="https://example.com"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
        />
        <p className="text-gray-500 text-xs mt-2">The website you want to monitor for changes</p>
      </div>

      {/* CSS Selector */}
      <div className="mb-6">
        <label className="block text-gray-300 font-semibold mb-2">
          CSS Selector (Optional)
        </label>
        <input
          type="text"
          value={formData.css_selector}
          onChange={(e) => setFormData({...formData, css_selector: e.target.value})}
          placeholder="body"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
        />
        <p className="text-gray-500 text-xs mt-2">
          Leave as 'body' to monitor entire page, or specify element like '.price' or '#content'
        </p>
      </div>

      {/* Check Interval */}
      <div className="mb-6">
        <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Check Interval *
        </label>
        <select
          value={formData.interval_minutes}
          onChange={(e) => setFormData({...formData, interval_minutes: parseInt(e.target.value)})}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
        >
          <option value={10}>Every 10 minutes</option>
          <option value={30}>Every 30 minutes</option>
          <option value={60}>Every hour</option>
          <option value={180}>Every 3 hours</option>
          <option value={360}>Every 6 hours</option>
          <option value={720}>Every 12 hours</option>
          <option value={1440}>Once daily</option>
        </select>
        <p className="text-gray-500 text-xs mt-2">How often to check for changes</p>
      </div>

      {/* Notifications */}
      <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-yellow-400" />
          <h3 className="text-white font-semibold">Notification Settings</h3>
        </div>
        <p className="text-gray-400 text-sm mb-4">Get alerted when changes are detected (at least one required)</p>
        
        {/* Discord Webhook */}
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-semibold mb-2">
            Discord Webhook URL
          </label>
          <input
            type="url"
            value={formData.discord_webhook}
            onChange={(e) => setFormData({...formData, discord_webhook: e.target.value})}
            placeholder="https://discord.com/api/webhooks/..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all text-sm"
          />
          <a 
            href="https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks" 
            target="_blank"
            className="text-blue-400 text-xs hover:underline mt-1 inline-block"
          >
            How to get Discord webhook? →
          </a>
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-300 text-sm font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="your@email.com"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all text-sm"
          />
          <p className="text-gray-500 text-xs mt-2">Coming soon - Discord only for now</p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || (!formData.discord_webhook && !formData.email)}
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

      {!formData.discord_webhook && !formData.email && (
        <p className="text-yellow-400 text-sm text-center mt-3">
          ⚠️ Please add at least one notification method
        </p>
      )}

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <h4 className="text-blue-300 font-semibold text-sm mb-2">✨ Free Tier Benefits</h4>
        <ul className="text-gray-400 text-xs space-y-1">
          <li>✓ Up to 3 cloud automations</li>
          <li>✓ Runs 24/7 automatically</li>
          <li>✓ No downloads or code needed</li>
          <li>✓ Instant Discord notifications</li>
        </ul>
      </div>
    </form>
  );
}
