"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function Hero () {

    const { isAuthenticated } = useSelector((state: any) => state.auth)
    return (
        <section className='flex flex-col-reverse md:flex-row items-center justify-between bg-white py-16 px-4 md: px-16'>
          <div className='md:w-1/2 mb-8 md: mb-0'>
          <h1 className='text-4xl md:text-5xl font-bold text-green-700 text-gray-800 mb-4'>
              Grow your business on Whatsapp 
            </h1>
            <p className='text-lg md: text-xl text-gray-600 mb-8'>
            Personalize communication and sell more with the WhatsApp Business API platform that automates marketing, sales, service and support.
            </p>
            <div className='space-x-4'>
                    <Link href='/features'>
                        <button className='bg-green-500 border-3 border-700-gray text-white hover: bg-green-600 font-semibold py-2 px-4 rounded-full transition-colors duration-300 ease-in-out'>
                            Explore Features 
                            </button>
                    </Link>
                    {isAuthenticated ? (
                    <Link href='/dashboard'>
                        <button className='bg-green-500 border-3 border-700-gray text-white hover: bg-green-600 font-semibold py-2 px-4 rounded-full transition-colors duration-300 ease-in-out'>
                            Dashboard
                            </button>
                    </Link>
                    ) : (
                        <Link href='/signup'>
                        <button className='bg-green-500 border-3 border-700-gray text-white hover: bg-green-600 font-semibold py-2 px-4 rounded-full transition-colors duration-300 ease-in-out'>
                            Get Started
                            </button>
                    </Link>
                    )}
                </div>
            </div>
                <div className='md: w-1/2 mb-8 md: mb-0'>
                    <Image
                        src="/hero-image.jpg"
                        alt='hero'
                        width={500}
                        height={300}
                        className='rounded-lg shadow-lg'
                        layout='responsive'
                    />
                </div>
                
        </section>
    );
}