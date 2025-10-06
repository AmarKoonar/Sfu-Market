'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <footer ref={footerRef} className="bg-black border-t border-[#54585A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#CC0633] to-[#A6192E] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-white">
                SFU <span className="text-[#CC0633]">Market</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              The exclusive marketplace for Simon Fraser University students. Buy, sell, and trade with confidence within the SFU community.
            </p>
            <p className="text-gray-500 text-sm">
              &copy; 2024 SFU Market. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#CC0633] transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-[#CC0633] transition-colors duration-300">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#CC0633] transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#CC0633] transition-colors duration-300">
                  Help Center
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#CC0633] transition-colors duration-300">
                  Safety Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#CC0633] transition-colors duration-300">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#54585A] text-center">
          <p className="text-gray-500 text-sm">
            Made with <span className="text-[#CC0633]">❤</span> for the SFU Community
          </p>
        </div>
      </div>
    </footer>
  );
}
