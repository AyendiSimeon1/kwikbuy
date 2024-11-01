import React from 'react';
import { Check } from 'lucide-react';

const ChatbotFeature = () => {
  const features = [
    'Create no-code chatbots to provide instant responses to common requests.',
    'Simplify mass communication and personalized responses with automated tools.',
    'Boost sales by directly converting more customer communications on WhatsApp.'
  ];

  return (
    <div className="bg-blue-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Features */}
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">Chatbots</h1>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="mt-1 flex-shrink-0">
                    <Check className="w-5 h-5 text-gray-800" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>

            <button className="mt-6 bg-green-400 text-white px-8 py-3 rounded-full hover:bg-green-500 transition-colors duration-200 inline-flex items-center">
              Chatbots Overview
            </button>
          </div>

          {/* Right side - Chat Interface */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-lg p-4 max-w-md mx-auto">
              {/* Chat Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Question</span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <span className="text-xl">⊕</span>
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <span className="text-xl">⋮</span>
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4">
                {/* Welcome Message */}
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    Hi there! 👋<br />
                    Welcome to Winner Real Estate.<br />
                    How can we help you today?
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-gray-700 hover:bg-gray-50 p-2 rounded transition-colors">
                    View our brochure
                  </button>
                  <button className="w-full text-left text-sm text-gray-700 hover:bg-gray-50 p-2 rounded transition-colors">
                    View Locations
                  </button>
                  <button className="w-full text-left text-sm text-gray-700 hover:bg-gray-50 p-2 rounded transition-colors">
                    About Winner Real Estate
                  </button>
                </div>

                {/* Time Indicators */}
                <div className="flex justify-between text-xs text-gray-400">
                  <span>14 Aug, Sat, 5:00 PM</span>
                  <span>16 Aug, Mon, 11:30 AM</span>
                </div>
              </div>

              {/* Connection Lines */}
              <div className="absolute right-0 top-1/2 transform translate-x-4">
                <svg className="w-16 h-32" viewBox="0 0 64 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 0C50 40 50 88 4 128" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4"/>
                </svg>
              </div>
            </div>

            {/* Secondary Chat Window */}
            <div className="absolute top-1/2 right-0 transform translate-x-20 -translate-y-1/2">
              <div className="bg-white rounded-xl shadow-lg p-4 w-48">
                <img src="/api/placeholder/160/120" alt="Handshake" className="w-full h-20 object-cover rounded mb-2" />
                <p className="text-xs text-gray-600">
                  Winner Real Estate was established in 2015 and has been creating a real estate revolution with their chain of view across the country and...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotFeature;