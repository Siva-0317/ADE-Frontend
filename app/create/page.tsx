'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { workflowsAPI, automationsAPI } from '@/lib/api';
import { AutomationType, WorkflowDesign } from '@/types';
import { Loader2, Download, Play } from 'lucide-react';
import CodeViewer from '@/components/CodeViewer';

// Separate component that uses useSearchParams
function CreateAutomationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [task, setTask] = useState(searchParams.get('task') || '');
  const [automationType, setAutomationType] = useState<AutomationType | ''>('');
  const [loading, setLoading] = useState(false);
  const [workflow, setWorkflow] = useState<WorkflowDesign | null>(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [step, setStep] = useState(1);

  const handleDesignWorkflow = async () => {
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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Create Automation</h1>

        {/* Step 1: Task Input */}
        {step === 1 && (
          <div className="max-w-2xl">
            <label className="block text-lg mb-2">Describe your automation task:</label>
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full h-40 bg-gray-800 border border-gray-700 rounded-lg p-4 
                       focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="e.g., Monitor Amazon product price and alert me when it drops below ₹5000"
            />

            <label className="block text-lg mb-2 mt-6">Automation Type (Optional):</label>
            <select
              value={automationType}
              onChange={(e) => setAutomationType(e.target.value as AutomationType)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 
                       focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="">Auto-detect</option>
              <option value={AutomationType.WEBSITE_MONITOR}>Website Monitor</option>
              <option value={AutomationType.PRICE_TRACKER}>Price Tracker</option>
              <option value={AutomationType.DISCORD_NOTIFIER}>Discord Notifier</option>
              <option value={AutomationType.SLACK_NOTIFIER}>Slack Notifier</option>
            </select>

            <button
              onClick={handleDesignWorkflow}
              disabled={!task || loading}
              className="mt-6 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 
                       text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  Designing...
                </span>
              ) : (
                'Design Workflow'
              )}
            </button>
          </div>
        )}

        {/* Step 2: Workflow Design */}
        {step === 2 && workflow && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Workflow Design</h2>
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <p className="text-gray-300 mb-4">{workflow.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {workflow.nodes.map((node, index) => (
                  <div key={node.id} className="bg-gray-700 rounded p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{index + 1}</span>
                      <h3 className="font-semibold">{node.label}</h3>
                    </div>
                    <p className="text-sm text-gray-400">{node.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setStep(3)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold 
                       py-3 px-8 rounded-lg transition"
            >
              Continue to Configuration
            </button>
          </div>
        )}

        {/* Step 3: Configuration */}
        {step === 3 && (
          <ConfigurationForm
            automationType={automationType as AutomationType}
            onSubmit={handleGenerateCode}
            loading={loading}
          />
        )}

        {/* Step 4: Generated Code */}
        {step === 4 && generatedCode && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Automation is Ready!</h2>
            <CodeViewer code={generatedCode} />
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  const blob = new Blob([generatedCode], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'automation.py';
                  a.click();
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold 
                         py-3 px-6 rounded-lg flex items-center gap-2 transition"
              >
                <Download size={20} />
                Download Script
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold 
                         py-3 px-6 rounded-lg transition"
              >
                View Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Main component with Suspense wrapper
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

function ConfigurationForm({ automationType, onSubmit, loading }: any) {
  const [config, setConfig] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(config);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Configure Automation</h2>

      {automationType === AutomationType.WEBSITE_MONITOR && (
        <>
          <div className="mb-4">
            <label className="block mb-2">Website URL:</label>
            <input
              type="url"
              required
              value={config.url || ''}
              onChange={(e) => setConfig({ ...config, url: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded p-3"
              placeholder="https://example.com"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Discord Webhook URL:</label>
            <input
              type="url"
              required
              value={config.webhook_url || ''}
              onChange={(e) => setConfig({ ...config, webhook_url: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded p-3"
              placeholder="https://discord.com/api/webhooks/..."
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">CSS Selector (optional):</label>
            <input
              type="text"
              value={config.css_selector || 'body'}
              onChange={(e) => setConfig({ ...config, css_selector: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded p-3"
              placeholder="body"
            />
          </div>
        </>
      )}

      {automationType === AutomationType.PRICE_TRACKER && (
        <>
          <div className="mb-4">
            <label className="block mb-2">Product URL:</label>
            <input
              type="url"
              required
              value={config.product_url || ''}
              onChange={(e) => setConfig({ ...config, product_url: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded p-3"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Target Price (₹):</label>
            <input
              type="number"
              required
              value={config.target_price || ''}
              onChange={(e) => setConfig({ ...config, target_price: parseFloat(e.target.value) })}
              className="w-full bg-gray-800 border border-gray-700 rounded p-3"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Webhook URL (Discord/Slack):</label>
            <input
              type="url"
              required
              value={config.webhook_url || ''}
              onChange={(e) => setConfig({ ...config, webhook_url: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded p-3"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 
                 text-white font-semibold py-3 px-8 rounded-lg transition"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin" size={20} />
            Generating...
          </span>
        ) : (
          'Generate Code'
        )}
      </button>
    </form>
  );
}
