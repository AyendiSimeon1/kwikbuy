"use client";
import { Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';




export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        <div className="flex items-center space-x-2">
         <Zap size={40} color='green'/> 
          
          <span className="text-3xl font-bold text-green-800 font-mono"> KwikBy</span>
        </div>

       
        <div className={`md:flex space-x-8 ${isOpen ? 'block' : 'hidden'}`}>
          <Link
            href="/pricing"
            className="text-gray-700 semi-bold text-2xl hover:text-green-800 transition-colors duration-300 ease-in-out"
          >
            Pricing
          </Link>
          <Link
            href="/features"
            className="text-gray-700 semi-bold text-2xl hover:text-green-500 transition-colors font-mono duration-300 ease-in-out"
          >
            Features
          </Link>
          <Link
            href="/resources"
            className="text-gray-700 semi-bold text-2xl hover:text-green-500 font-mono transition-colors duration-300 ease-in-out"
          >
            Resources
          </Link>
        </div>

        
        <div className="space-x-4">
        {/* {isAuthenticated ? (
          <Link
            href="/dashboard"
            className="bg-green-700 border-4 border-black hover:bg-green-600 text-white font-mono font-semibold py-2 px-4 rounded-full transition-colors duration-300 ease-in-out"
          >
            Dashboard
          </Link> 
          ) : (  )} */}
            <Link href='/signup' className='bg-green-800 border-3 border-black-200 hover:bg-green-500 font-mono text-white font-semibold py-3 px-5 rounded-full transition-colors duration-300 ease-in-out'>
                Sign up
            </Link>

        
        </div>

        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={toggleMenu}
        >
          <svg
            className={`h-6 w-6 ${isOpen ? 'hidden' : 'block'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            className={`h-6 w-6 ${isOpen ? 'block' : 'hidden'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}