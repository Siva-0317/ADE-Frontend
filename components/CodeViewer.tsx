'use client';

import { Highlight, themes } from 'prism-react-renderer';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function CodeViewer({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 p-2 rounded z-10"
      >
        {copied ? <Check size={20} /> : <Copy size={20} />}
      </button>
      <Highlight theme={themes.nightOwl} code={code} language="python">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} p-6 rounded-lg overflow-x-auto max-h-96`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
