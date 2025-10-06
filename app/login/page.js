'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { createAccount, loginAccount } from '@/lib/api';
import { createToken, setAuthToken } from '@/lib/auth';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formRef = useRef(null);
  const switchRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.2 }
      );
    }
  }, []);

  useEffect(() => {
    if (switchRef.current) {
      gsap.fromTo(
        switchRef.current,
        { x: isLogin ? 100 : -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [isLogin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateEmail = (email) => {
    return email.toLowerCase().endsWith('@sfu.ca');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!validateEmail(formData.email)) {
        throw new Error('Please use your SFU email (@sfu.ca)');
      }

      if (!isLogin) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        if (!formData.username || formData.username.length < 3) {
          throw new Error('Username must be at least 3 characters');
        }

        const response = await createAccount(
          formData.username,
          formData.email,
          formData.password
        );

        const token = await createToken({
          user_id: response.account.user_id,
          email: response.account.email,
          username: response.account.username,
        });

        setAuthToken(token);
        router.push('/dashboard');
      } else {
        const response = await loginAccount(formData.email, formData.password);

        const token = await createToken({
          user_id: response.account.user_id,
          email: response.account.email,
          username: response.account.username,
        });

        setAuthToken(token);
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#CC0633] rounded-full filter blur-[128px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#A6192E] rounded-full filter blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div ref={formRef} className="relative z-10 max-w-md w-full">
          <div className="bg-gradient-to-br from-[#54585A]/30 to-black/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-2">
                {isLogin ? 'Welcome Back' : 'Join SFU Market'}
              </h2>
              <p className="text-gray-400">
                {isLogin ? 'Sign in to continue trading' : 'Create your account to get started'}
              </p>
            </div>

            <div ref={switchRef} className="flex gap-2 mb-8 bg-black/50 p-1 rounded-full">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-full font-medium transition-all duration-300 ${
                  isLogin
                    ? 'bg-[#CC0633] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-full font-medium transition-all duration-300 ${
                  !isLogin
                    ? 'bg-[#CC0633] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required={!isLogin}
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#CC0633] transition-colors duration-300"
                    placeholder="johndoe"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  SFU Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#CC0633] transition-colors duration-300"
                  placeholder="student@sfu.ca"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#CC0633] transition-colors duration-300"
                  placeholder="••••••••"
                />
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required={!isLogin}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#CC0633] transition-colors duration-300"
                    placeholder="••••••••"
                  />
                </div>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#CC0633] hover:bg-[#A6192E] text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <a href="/contact" className="text-gray-400 hover:text-[#CC0633] text-sm transition-colors duration-300">
                Need help? Contact support
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
