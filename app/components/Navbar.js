'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { getCurrentUser, removeAuthToken } from '@/lib/auth';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }
    loadUser();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    setUser(null);
    router.push('/');
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-12 h-12 bg-gradient-to-br from-[#CC0633] to-[#A6192E] rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold text-white">
              SFU <span className="text-[#CC0633]">Market</span>
            </span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={`text-white hover:text-[#CC0633] transition-colors duration-300 font-medium ${
                pathname === '/' ? 'text-[#CC0633]' : ''
              }`}
            >
              Home
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className={`text-white hover:text-[#CC0633] transition-colors duration-300 font-medium ${
                  pathname === '/dashboard' ? 'text-[#CC0633]' : ''
                }`}
              >
                Dashboard
              </Link>
            )}
            <Link
              href="/contact"
              className={`text-white hover:text-[#CC0633] transition-colors duration-300 font-medium ${
                pathname === '/contact' ? 'text-[#CC0633]' : ''
              }`}
            >
              Contact
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white text-sm">Hi, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-[#CC0633] hover:bg-[#A6192E] text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-[#CC0633] hover:bg-[#A6192E] text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
