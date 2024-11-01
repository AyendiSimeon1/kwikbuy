import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

const BroadcastFeature = () => {
  const broadcasts = [
    { name: 'Limited-Time Launch Offer', status: 'Completed', recipients: '15 Contacts' },
    { name: 'Generation AI Course', status: 'Completed', recipients: '25 Contacts' },
    { name: 'Better & Learn Together', status: 'Completed', recipients: '55 Contacts' },
    { name: 'Upgrade Your Skills', status: 'Completed', recipients: '85 Contacts' },
    { name: 'Scholarship Selections', status: 'Completed', recipients: '100 Contacts' },
    { name: 'Expert Workshop Forms', status: 'Completed', recipients: '15 Contacts' },
    { name: 'Virtual Campus Tours', status: 'Completed', recipients: '40 Contacts' },
    { name: 'Course Discovery Week', status: 'Completed', recipients: '100 Contacts' },
    { name: 'Test Prep Checklist', status: 'Completed', recipients: '15 Contacts' },
  ];

  const features = [
    'Push out your campaigns and engage with high response WhatsApp messages.',
    'Tag contacts, categorize and target them in groups using personalized communications.',
    'Build and nurture the relationships that generate future sales by engaging with your audiences regularly on WhatsApp.'
  ];

  return (
    <div className="bg-blue-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">Features</h1>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Broadcast Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Recipients</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {broadcasts.map((broadcast, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-3 text-sm text-gray-800">{broadcast.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{broadcast.status}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{broadcast.recipients}</td>
                      <td className="px-4 py-3 flex justify-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right side - Features */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">Broadcast</h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="mt-1 flex-shrink-0">
                    <Check className="w-5 h-5 text-gray-800" />
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
            <Link href='/dashboard'>            <button className="mt-6 bg-green-400 text-white px-6 py-2 rounded-full hover:bg-green-500 transition-colors">
              Broadcast Overview
            </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BroadcastFeature;