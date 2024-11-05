import React from 'react';
import { Check } from 'lucide-react';

const BusinessAnalyticsFeature = () => {
  const features = [
    'Track customer engagement and conversion rates across multiple campaigns.',
    'Gain insights into customer demographics and behavior to tailor marketing efforts.',
    'Monitor real-time performance metrics to make data-driven decisions.'
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
      
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">Business Analytics</h1>
            
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

            <button className="mt-6 bg-green-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors duration-200 inline-flex items-center">
              Explore Analytics
            </button>
          </div>


          <div className="relative">
            <div className="bg-white rounded-3xl shadow-lg p-4 max-w-md mx-auto">
    
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Analytics Overview</span>
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

              <div className="space-y-4">
     
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    Good day! 🌞<br />
                    Here are the top metrics for your business today:
                  </p>
                </div>

                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-gray-700 hover:bg-gray-50 p-2 rounded transition-colors">
                    View Engagement Stats
                  </button>
                  <button className="w-full text-left text-sm text-gray-700 hover:bg-gray-50 p-2 rounded transition-colors">
                    Check Conversion Rate
                  </button>
                  <button className="w-full text-left text-sm text-gray-700 hover:bg-gray-50 p-2 rounded transition-colors">
                    Customer Demographics
                  </button>
                </div>

                <div className="flex justify-between text-xs text-gray-400">
                  <span>Last Updated: 10:30 AM</span>
                  <span>Next Update: 4:00 PM</span>
                </div>
              </div>

              <div className="absolute right-0 top-1/2 transform translate-x-4">
                <svg className="w-16 h-32" viewBox="0 0 64 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 0C50 40 50 88 4 128" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4"/>
                </svg>
              </div>
            </div>

            <div className="absolute top-1/2 right-0 transform translate-x-20 -translate-y-1/2">
              <div className="bg-white rounded-xl shadow-lg p-4 w-48">
                <p className="text-xs text-gray-600">
                  Understand your customers better with our detailed analytics, including real-time insights and growth trends to help you strategize.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalyticsFeature;
