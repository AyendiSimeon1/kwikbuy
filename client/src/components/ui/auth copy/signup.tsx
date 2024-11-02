'use client';

import { ChangeEvent, useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value }  = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
    
        <div className="flex justify-start mb-6">
          <svg className="w-8 h-8" viewBox="0 0 24 24">
            <path
              fill="#34D399"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-normal text-gray-900 mb-8">
          Create an Account
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label 
                htmlFor="firstName"
                className="block text-sm text-gray-700 mb-1"
              >
                Enter your name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                placeholder="First name"
                required
              />
            </div>

            <div>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                placeholder="Last name (optional)"
              />
            </div>
          </div>

          {/* Next Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            >
              Next
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 flex justify-between text-sm">
          <select className="text-gray-600 bg-transparent focus:outline-none">
            <option>English (United States)</option>
          </select>
          <div className="space-x-4">
            <Link href="/help" className="text-gray-600 hover:text-green-600">
              Help
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-green-600">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-green-600">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}