import React from 'react';
import Link from 'next/link';
import { Twitter, Instagram, Facebook } from'react-feather';
const Footer = () => {
    const currentYear = new Date().getFullYear();
    const footerLinks = {
        Company: [
            { name: 'About Us', link: '/about' },
            { name: 'Contact', link: '/contact' },
            { name: 'Careers', link: '/careers' },
        ],
        Resources: [
            { name: 'Documentation', link: '/docs' },
            { name: 'Blog', link: '/blog' },
            { name: 'Help Center', link: '/help-center' },
        ],
        Legal: [
            { name: 'Terms of Service', link: '/terms-of-service' },
            { name: 'Privacy Policy', link: '/privacy-policy' },
            { name: 'Cookie Policy', link: '/cookie-policy' },
        ]
    };
    
    const socialLinks = [
        { icon: Twitter, link: 'https://twitter.com' },
        { icon: Instagram, link: 'https://instagram.com' },
        { icon: Facebook, link: 'https://facebook.com'}    
    ];

    return (
        <footer className='bg-gray-900 text-gray-300'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-8 pt-5'>
                    <div className='space-y-4'>
                        <h2 className='text-white text-xl font-bold'>
                            KwikBuy
                        </h2>
                        <p className='text-sm text-gray-400'>
                            Making the world a better place through inovvation
                        </p>

                <div className='flex space-x-4'>
                    {socialLinks.map((social, index) => {
                        const Icon = social.icon;
                        return (
                            <Link href={social.link} key={index} className='text-gay-400 hover:text-white transition-colors'>
                            <Icon size={24} />
                            </Link>
                        )
                    })}
                </div>
            </div>

            {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category} className='space-y-4'>
                    <h3 className='text-lg text-white font-semibold'>
                        {category}
                    </h3>
                    <ul className='space-y-4'>
                        {links.map((link) => (
                            <li key={link.name}>
                                <Link href={link.link} className='text-sm text-gray-400 hover:text-white transition-colors'>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    
                </div>
            ))}
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {currentYear} KwikBuy. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <select 
                className="bg-gray-800 text-gray-300 text-sm rounded-md px-3 py-1 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </div>
     </div>
    </footer>

    );
};

export default Footer;
    