'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Agentic Automation
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-white transition-all"
            >
              Home
            </Link>
            <Link 
              href="/how-it-works" 
              className="text-gray-300 hover:text-white transition-all"
            >
              How It Works
            </Link>
            <Link 
              href="/create" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all font-semibold"
            >
              Create Automation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-800 py-4 space-y-3">
            <Link 
              href="/" 
              className="block text-gray-300 hover:text-white transition-all py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/how-it-works" 
              className="block text-gray-300 hover:text-white transition-all py-2"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              href="/create" 
              className="block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all font-semibold text-center"
              onClick={() => setIsOpen(false)}
            >
              Create Automation
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
