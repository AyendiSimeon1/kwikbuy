"use client";
import Image from 'next/image';
import Link from 'next/link';


export default function Hero () {
    

    return (
        <section className='flex flex-col-reverse md:flex-row items-center justify-between bg-white py-16 px-4 md: px-16'>
          <div className='md:w-1/2 mb-8 md: mb-0 mx-6'>
          <h1 className='text-2xl md:text-7xl font-bold font-mono text-green-800 transition-opacity duration-500 ease-in-out opacity-100 mb-1'>
             Unlock the Full Potential of Your Business
            </h1>
            <p className='text-lg md: text-2xl text-gray-600 mb-8'>
            Our innovative tools for WhatsApp empower you to streamline operations, enhance customer engagement, and drive growth.
            </p>
            <div className='space-x-4'>
                    <Link href='/features'>
                        <button className='bg-green-500 border-3 border-700-gray text-white hover: bg-green-600 font-semibold py-2 px-4 rounded-full transition-colors duration-300 ease-in-out'>
                            Explore Features 
                            </button>
                    </Link>
                    {/* {isAuthenticated ? (
                    <Link href='/dashboard'>
                        <button className='bg-green-500 border-3 border-700-gray text-white hover: bg-green-600 font-semibold py-2 px-4 rounded-full transition-colors duration-300 ease-in-out'>
                            Dashboard
                            </button>
                    </Link>
                    ) : (     )} */}
                        <Link href='/signup'>
                        <button className='bg-green-500 border-3 border-700-gray text-white hover: bg-green-600 font-semibold py-2 px-4 rounded-full transition-colors duration-300 ease-in-out'>
                            Get Started
                            </button>
                    </Link>
               
                </div>
            </div>
            <div style={{ position: 'relative', width: '700px', height: '350px' }}>
                <Image
                    src="/hero-business-image.jpg"
                    alt='hero'
                    layout='fill' // Fills the container
                    objectFit='cover' // Adjusts how the image fits within the container
                    className='rounded-lg shadow-lg '
                />
            </div>
                
        </section>
    );
}