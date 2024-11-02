import React from 'react';

const CTASection = () => {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="bg-emerald-400 rounded-3xl p-8 border-2 border-black relative overflow-hidden shadow-lg">
        <div className="max-w-4xl space-y-8">
          <h2 className="text-3xl font-bold">
            <span className="text-gray-900">Discover more.</span>
            <span className="text-gray-800">
           WhatsApp, Facebook and Instagram's share of social media messaging is unrivaled. Harness it with one of the fastest growing WhatsApp Business Solution Providers.
            </span>
          </h2>

          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-gray-900 px-8 py-3 rounded-full border-2 border-black hover:bg-gray-50 transition-colors duration-200">
              Free 7 Day Trial
            </button>
            <button className="bg-transparent text-gray-900 px-8 py-3 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors duration-200">
              Book a Demo
            </button>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-300 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-300 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>
      </div>
    </div>
  );
};

export default CTASection;