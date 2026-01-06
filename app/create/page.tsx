'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { workflowsAPI, automationsAPI } from '@/lib/api';
import { AutomationType, WorkflowDesign } from '@/types';
import { 
  Loader2, 
  Download, 
  Play, 
  HelpCircle, 
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Copy,
  Eye,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import CodeViewer from '@/components/CodeViewer';

function CreateAutomationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [task, setTask] = useState(searchParams.get('task') || '');
  const [automationType, setAutomationType] = useState<AutomationType | ''>('');
  const [loading, setLoading] = useState(false);
  const [workflow, setWorkflow] = useState<WorkflowDesign | null>(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [step, setStep] = useState(1);
  const [showWebhookHelp, setShowWebhookHelp] = useState(false);
  const [showSelectorHelp, setShowSelectorHelp] = useState(false);
  const [copiedWebhook, setCopiedWebhook] = useState(false);

  const handleDesignWorkflow = async () => {
    if (!task.trim()) {
      alert('Please describe what you want to automate!');
      return;
    }
    
    setLoading(true);
    try {
      const response = await workflowsAPI.design(task, automationType || undefined);
      setWorkflow(response.data);
      setStep(2);
    } catch (error) {
      console.error('Failed to design workflow:', error);
      alert('Failed to design workflow. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCode = async (config: any) => {
    setLoading(true);
    try {
      const response = await automationsAPI.create({
        name: task.substring(0, 50),
        description: task,
        type: automationType || AutomationType.DISCORD_NOTIFIER,
        config: config,
        schedule: '*/30 * * * *',
      });
      setGeneratedCode(response.data.workflow_code);
      setStep(4);
    } catch (error) {
      console.error('Failed to generate code:', error);
      alert('Failed to generate automation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Mobile-Friendly Navigation */}
      <nav className="bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.push('/')} 
              className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent truncate max-w-[200px] sm:max-w-none"
            >
              Agentic Automation
            </button>
            <button 
              onClick={() => router.push('/how-it-works')} 
              className="text-sm sm:text-base text-gray-300 hover:text-white transition-all whitespace-nowrap"
            >
              Need Help?
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 max-w-5xl">
        {/* Mobile-Optimized Progress Bar */}
        <div className="mb-8 sm:mb-12">
          {/* Desktop Progress Bar */}
          <div className="hidden md:flex items-center justify-between mb-4">
            {[
              { num: 1, label: 'Describe' },
              { num: 2, label: 'Design' },
              { num: 3, label: 'Configure' },
              { num: 4, label: 'Download' }
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className={`flex flex-col items-center flex-1 ${idx > 0 ? 'ml-4' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= s.num 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'bg-gray-800 text-gray-500'
                  }`}>
                    {step > s.num ? <CheckCircle size={20} /> : s.num}
                  </div>
                  <div className={`mt-2 text-sm font-semibold ${step >= s.num ? 'text-purple-400' : 'text-gray-500'}`}>
                    {s.label}
                  </div>
                </div>
                {idx < 3 && (
                  <div className={`h-1 flex-1 transition-all ${
                    step > s.num ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-800'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Mobile Progress Indicator */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Step {step} of 4</span>
              <span className="text-sm font-semibold text-purple-400">
                {['Describe', 'Design', 'Configure', 'Download'][step - 1]}
              </span>
            </div>
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-full transition-all duration-500"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step 1: Task Input */}
        {step === 1 && (
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Sparkles className="text-purple-400 flex-shrink-0" size={24} />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">What do you want to automate?</h2>
            </div>

            <div className="mb-4 sm:mb-6">
              <label className="block text-base sm:text-lg font-semibold mb-2 sm:mb-3">Describe your automation:</label>
              <textarea
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full h-32 sm:h-40 bg-gray-900/50 border-2 border-gray-700 focus:border-purple-500 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none transition-all resize-none"
                placeholder="Example: Monitor iPhone 15 price on Amazon and notify me on Discord when it drops below ₹50,000"
              />
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                💡 Be specific! Include what to monitor, when to alert, and where to send notifications.
              </p>
            </div>

            {/* Quick Examples */}
            <div className="mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm font-semibold text-gray-400 mb-2 sm:mb-3">Try these examples:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {[
                  "Track Bitcoin price and alert when it changes by ₹10,000",
                  "Monitor Hacker News and notify of top story changes",
                  "Watch Amazon product price and alert when below ₹5000",
                  "Check my website uptime every 5 minutes"
                ].map((example) => (
                  <button
                    key={example}
                    onClick={() => setTask(example)}
                    className="text-left bg-gray-900/50 hover:bg-gray-900 border border-gray-700 hover:border-purple-500/50 rounded-lg p-2.5 sm:p-3 text-xs sm:text-sm transition-all"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <label className="block text-base sm:text-lg font-semibold mb-2 sm:mb-3">Automation Type (Optional):</label>
              <select
                value={automationType}
                onChange={(e) => setAutomationType(e.target.value as AutomationType)}
                className="w-full bg-gray-900/50 border-2 border-gray-700 focus:border-purple-500 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-white focus:outline-none transition-all cursor-pointer"
              >
                <option value="">🤖 Auto-detect (Recommended)</option>
                <option value={AutomationType.WEBSITE_MONITOR}>🌐 Website Monitor</option>
                <option value={AutomationType.PRICE_TRACKER}>💰 Price Tracker</option>
                <option value={AutomationType.DISCORD_NOTIFIER}>🔔 Discord Notifier</option>
                <option value={AutomationType.SLACK_NOTIFIER}>📱 Slack Notifier</option>
              </select>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                Leave on "Auto-detect" and our AI will choose the best type for you!
              </p>
            </div>

            <button
              onClick={handleDesignWorkflow}
              disabled={!task.trim() || loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base sm:text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span className="hidden sm:inline">Designing Workflow...</span>
                  <span className="sm:hidden">Designing...</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span className="hidden sm:inline">Design My Automation</span>
                  <span className="sm:hidden">Design Automation</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 2: Workflow Design */}
        {step === 2 && workflow && (
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Your Workflow is Ready!</h2>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">{workflow.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {workflow.nodes.map((node, index) => (
                <div key={node.id} className="bg-gray-900/50 border border-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-5 hover:border-purple-500/50 transition-all">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <h3 className="font-bold text-base sm:text-lg">{node.label}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400">{node.description}</p>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setStep(3)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all text-base sm:text-lg"
            >
              Continue to Configuration →
            </button>
          </div>
        )}

        {/* Step 3: Configuration */}
        {step === 3 && (
          <ConfigurationForm
            automationType={automationType as AutomationType}
            onSubmit={handleGenerateCode}
            loading={loading}
            showWebhookHelp={showWebhookHelp}
            setShowWebhookHelp={setShowWebhookHelp}
            showSelectorHelp={showSelectorHelp}
            setShowSelectorHelp={setShowSelectorHelp}
          />
        )}

        {/* Step 4: Generated Code */}
        {step === 4 && generatedCode && (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
              <CheckCircle className="mx-auto mb-3 sm:mb-4 text-green-400" size={48} />
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Your Automation is Ready!</h2>
              <p className="text-sm sm:text-base text-gray-300">Download and run your custom automation script</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <h3 className="text-lg sm:text-xl font-bold">Generated Python Script</h3>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedCode);
                    setCopiedWebhook(true);
                    setTimeout(() => setCopiedWebhook(false), 2000);
                  }}
                  className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-all text-sm sm:text-base"
                >
                  {copiedWebhook ? <CheckCircle size={18} /> : <Copy size={18} />}
                  {copiedWebhook ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <div className="overflow-x-auto">
                <CodeViewer code={generatedCode} />
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                <Play className="text-blue-400 flex-shrink-0" size={20} />
                How to Run Your Automation
              </h3>
              <ol className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
                <li className="flex gap-2 sm:gap-3">
                  <span className="bg-blue-600 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs sm:text-sm font-bold">1</span>
                  <span>Download the script using the button below</span>
                </li>
                <li className="flex gap-2 sm:gap-3">
                  <span className="bg-blue-600 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs sm:text-sm font-bold">2</span>
                  <div>
                    <span>Install dependencies:</span>
                    <code className="block bg-gray-800 px-2 py-1 rounded text-xs sm:text-sm mt-1 overflow-x-auto">
                      pip install requests beautifulsoup4 urllib3
                    </code>
                  </div>
                </li>
                <li className="flex gap-2 sm:gap-3">
                  <span className="bg-blue-600 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs sm:text-sm font-bold">3</span>
                  <div>
                    <span>Run the script:</span>
                    <code className="block bg-gray-800 px-2 py-1 rounded text-xs sm:text-sm mt-1">
                      python automation.py
                    </code>
                  </div>
                </li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => {
                  const blob = new Blob([generatedCode], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'automation.py';
                  a.click();
                }}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition-all text-base sm:text-lg"
              >
                <Download size={20} />
                Download Script
              </button>
              <button
                onClick={() => {
                  setStep(1);
                  setTask('');
                  setAutomationType('');
                  setWorkflow(null);
                  setGeneratedCode('');
                }}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all text-base sm:text-lg"
              >
                Create Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CreateAutomation() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    }>
      <CreateAutomationContent />
    </Suspense>
  );
}

function ConfigurationForm({ automationType, onSubmit, loading, showWebhookHelp, setShowWebhookHelp, showSelectorHelp, setShowSelectorHelp }: any) {
  const [config, setConfig] = useState<any>({});
  const [errors, setErrors] = useState<any>({});

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};

    if (automationType === AutomationType.WEBSITE_MONITOR) {
      if (!config.url) newErrors.url = 'Website URL is required';
      else if (!validateUrl(config.url)) newErrors.url = 'Invalid URL format';
      if (!config.webhook_url) newErrors.webhook_url = 'Discord webhook is required';
      else if (!validateUrl(config.webhook_url)) newErrors.webhook_url = 'Invalid webhook URL';
    }

    if (automationType === AutomationType.PRICE_TRACKER) {
      if (!config.product_url) newErrors.product_url = 'Product URL is required';
      if (!config.target_price || config.target_price <= 0) newErrors.target_price = 'Valid target price is required';
      if (!config.webhook_url) newErrors.webhook_url = 'Webhook URL is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(config);
  };

  const commonSelectors = [
    { value: 'body', label: 'Entire page' },
    { value: '.price', label: 'Price' },
    { value: '#content', label: 'Content' },
    { value: 'h1', label: 'Heading' },
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Configure Your Automation</h2>

      {automationType === AutomationType.WEBSITE_MONITOR && (
        <>
          {/* Website URL */}
          <div className="mb-4 sm:mb-6">
            <label className="block font-semibold mb-2 text-base sm:text-lg">Website URL to Monitor:</label>
            <input
              type="url"
              value={config.url || ''}
              onChange={(e) => {
                setConfig({ ...config, url: e.target.value });
                setErrors({ ...errors, url: '' });
              }}
              className={`w-full bg-gray-900/50 border-2 ${errors.url ? 'border-red-500' : 'border-gray-700'} focus:border-purple-500 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none transition-all`}
              placeholder="https://example.com"
            />
            {errors.url && <p className="text-red-400 text-xs sm:text-sm mt-2">{errors.url}</p>}
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              💡 Enter the full URL of the website you want to monitor
            </p>
          </div>

          {/* Discord Webhook */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <label className="font-semibold text-base sm:text-lg">Discord Webhook URL:</label>
              <button
                type="button"
                onClick={() => setShowWebhookHelp(!showWebhookHelp)}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-xs sm:text-sm transition-all self-start sm:self-auto"
              >
                <HelpCircle size={16} />
                How to get this?
              </button>
            </div>
            
            {showWebhookHelp && (
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg sm:rounded-xl p-3 sm:p-5 mb-3 sm:mb-4">
                <h4 className="font-bold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                  📝 How to Get Your Discord Webhook:
                </h4>
                <ol className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                  <li>1. Open Discord and go to your server</li>
                  <li>2. Right-click a channel → <strong>Edit Channel</strong></li>
                  <li>3. Click <strong>Integrations</strong> → <strong>Webhooks</strong></li>
                  <li>4. Click <strong>New Webhook</strong></li>
                  <li>5. Name it "Automation Bot" and copy the URL</li>
                  <li>6. Paste it here!</li>
                </ol>
                <a 
                  href="https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mt-2 sm:mt-3 text-xs sm:text-sm"
                >
                  Watch Discord's Guide <ExternalLink size={12} />
                </a>
              </div>
            )}
            
            <input
              type="url"
              value={config.webhook_url || ''}
              onChange={(e) => {
                setConfig({ ...config, webhook_url: e.target.value });
                setErrors({ ...errors, webhook_url: '' });
              }}
              className={`w-full bg-gray-900/50 border-2 ${errors.webhook_url ? 'border-red-500' : 'border-gray-700'} focus:border-purple-500 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none transition-all`}
              placeholder="https://discord.com/api/webhooks/..."
            />
            {errors.webhook_url && <p className="text-red-400 text-xs sm:text-sm mt-2">{errors.webhook_url}</p>}
          </div>

          {/* CSS Selector */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <label className="font-semibold text-base sm:text-lg">CSS Selector (Optional):</label>
              <button
                type="button"
                onClick={() => setShowSelectorHelp(!showSelectorHelp)}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-xs sm:text-sm transition-all self-start sm:self-auto"
              >
                <HelpCircle size={16} />
                What is this?
              </button>
            </div>

            {showSelectorHelp && (
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg sm:rounded-xl p-3 sm:p-5 mb-3 sm:mb-4">
                <h4 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">🎯 CSS Selector Explained:</h4>
                <p className="text-xs sm:text-sm text-gray-300 mb-2 sm:mb-3">
                  A CSS selector tells the automation which part of the website to monitor.
                </p>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <p><code className="bg-gray-800 px-1.5 py-0.5 rounded text-xs">body</code> - Watch entire page</p>
                  <p><code className="bg-gray-800 px-1.5 py-0.5 rounded text-xs">.price</code> - Watch price elements</p>
                  <p><code className="bg-gray-800 px-1.5 py-0.5 rounded text-xs">#content</code> - Watch content section</p>
                </div>
                <p className="text-xs text-gray-400 mt-2 sm:mt-3">
                  💡 Leave as "body" to monitor the whole page!
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="text"
                value={config.css_selector || 'body'}
                onChange={(e) => setConfig({ ...config, css_selector: e.target.value })}
                className="flex-1 bg-gray-900/50 border-2 border-gray-700 focus:border-purple-500 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none transition-all"
                placeholder="body"
              />
              <select
                onChange={(e) => setConfig({ ...config, css_selector: e.target.value })}
                className="w-full sm:w-auto bg-gray-900/50 border-2 border-gray-700 focus:border-purple-500 rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base text-white focus:outline-none transition-all cursor-pointer"
              >
                <option value="">Quick Select...</option>
                {commonSelectors.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              💡 Use "body" to monitor everything
            </p>
          </div>
        </>
      )}

      {automationType === AutomationType.PRICE_TRACKER && (
        <>
          <div className="mb-4 sm:mb-6">
            <label className="block font-semibold mb-2 text-base sm:text-lg">Product URL:</label>
            <input
              type="url"
              value={config.product_url || ''}
              onChange={(e) => {
                setConfig({ ...config, product_url: e.target.value });
                setErrors({ ...errors, product_url: '' });
              }}
              className={`w-full bg-gray-900/50 border-2 ${errors.product_url ? 'border-red-500' : 'border-gray-700'} focus:border-purple-500 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none transition-all`}
              placeholder="https://www.amazon.in/dp/PRODUCT_ID"
            />
            {errors.product_url && <p className="text-red-400 text-xs sm:text-sm mt-2">{errors.product_url}</p>}
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              💡 Paste the full product page URL
            </p>
          </div>

          <div className="mb-4 sm:mb-6">
            <label className="block font-semibold mb-2 text-base sm:text-lg">Target Price (₹):</label>
            <input
              type="number"
              value={config.target_price || ''}
              onChange={(e) => {
                setConfig({ ...config, target_price: parseFloat(e.target.value) });
                setErrors({ ...errors, target_price: '' });
              }}
              className={`w-full bg-gray-900/50 border-2 ${errors.target_price ? 'border-red-500' : 'border-gray-700'} focus:border-purple-500 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none transition-all`}
              placeholder="50000"
            />
            {errors.target_price && <p className="text-red-400 text-xs sm:text-sm mt-2">{errors.target_price}</p>}
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              💡 Get notified when price drops to or below this amount
            </p>
          </div>

          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <label className="font-semibold text-base sm:text-lg">Discord Webhook URL:</label>
              <button
                type="button"
                onClick={() => setShowWebhookHelp(!showWebhookHelp)}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-xs sm:text-sm transition-all self-start sm:self-auto"
              >
                <HelpCircle size={16} />
                How to get this?
              </button>
            </div>
            
            {showWebhookHelp && (
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg sm:rounded-xl p-3 sm:p-5 mb-3 sm:mb-4">
                <h4 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">📝 How to Get Your Discord Webhook:</h4>
                <ol className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                  <li>1. Open Discord and go to your server</li>
                  <li>2. Right-click a channel → <strong>Edit Channel</strong></li>
                  <li>3. Click <strong>Integrations</strong> → <strong>Webhooks</strong></li>
                  <li>4. Click <strong>New Webhook</strong></li>
                  <li>5. Copy the webhook URL and paste here</li>
                </ol>
              </div>
            )}
            
            <input
              type="url"
              value={config.webhook_url || ''}
              onChange={(e) => {
                setConfig({ ...config, webhook_url: e.target.value });
                setErrors({ ...errors, webhook_url: '' });
              }}
              className={`w-full bg-gray-900/50 border-2 ${errors.webhook_url ? 'border-red-500' : 'border-gray-700'} focus:border-purple-500 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none transition-all`}
              placeholder="https://discord.com/api/webhooks/..."
            />
            {errors.webhook_url && <p className="text-red-400 text-xs sm:text-sm mt-2">{errors.webhook_url}</p>}
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base sm:text-lg"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span className="hidden sm:inline">Generating Your Code...</span>
            <span className="sm:hidden">Generating...</span>
          </>
        ) : (
          <>
            <Sparkles size={20} />
            <span className="hidden sm:inline">Generate Automation Code</span>
            <span className="sm:hidden">Generate Code</span>
          </>
        )}
      </button>
    </form>
  );
}
