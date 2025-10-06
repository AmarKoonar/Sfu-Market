'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-title',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      );

      gsap.fromTo(
        '.hero-subtitle',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      );

      gsap.fromTo(
        '.hero-cta',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.7 }
      );

      gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=100',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.2,
          }
        );
      });

      gsap.utils.toArray('.step-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=100',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      gsap.utils.toArray('.stat-number').forEach((stat) => {
        gsap.fromTo(
          stat,
          { scale: 0, rotation: -180, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: stat,
              start: 'top bottom-=100',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      gsap.fromTo(
        ctaRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#A6192E]/20 to-black"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#CC0633] rounded-full filter blur-[128px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#A6192E] rounded-full filter blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="hero-title text-6xl md:text-8xl font-bold text-white mb-6">
            SFU <span className="text-[#CC0633]">Marketplace</span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            The exclusive marketplace for Simon Fraser University students. Buy, sell, and trade with confidence within the SFU community.
          </p>
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/login"
              className="bg-[#CC0633] hover:bg-[#A6192E] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#CC0633]/50"
            >
              Get Started Now
            </a>
            <a
              href="#how-it-works"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold border border-white/20 transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section ref={featuresRef} className="py-32 bg-gradient-to-b from-black to-[#54585A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              Why Choose <span className="text-[#CC0633]">SFU Market</span>?
            </h2>
            <p className="text-xl text-gray-400">Everything you need for seamless campus trading</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card bg-gradient-to-br from-[#54585A]/30 to-black/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-[#CC0633]/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#CC0633] to-[#A6192E] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Secure & Safe</h3>
              <p className="text-gray-400">
                Trade exclusively with verified SFU students. Your safety is our top priority with secure authentication and verified users.
              </p>
            </div>

            <div className="feature-card bg-gradient-to-br from-[#54585A]/30 to-black/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-[#CC0633]/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#CC0633] to-[#A6192E] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Fast & Easy</h3>
              <p className="text-gray-400">
                List items in seconds, browse with powerful filters, and connect with buyers instantly. Trading made simple.
              </p>
            </div>

            <div className="feature-card bg-gradient-to-br from-[#54585A]/30 to-black/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-[#CC0633]/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#CC0633] to-[#A6192E] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Community First</h3>
              <p className="text-gray-400">
                Built by SFU students, for SFU students. Join a trusted community of campus traders and make meaningful connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" ref={howItWorksRef} className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              How It <span className="text-[#CC0633]">Works</span>
            </h2>
            <p className="text-xl text-gray-400">Start trading in three simple steps</p>
          </div>

          <div className="space-y-24">
            <div className="step-card flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="inline-block bg-[#CC0633] text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  1
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Create Your Account</h3>
                <p className="text-gray-400 text-lg">
                  Sign up with your SFU email to join our exclusive marketplace. Quick verification ensures a safe community for all students.
                </p>
              </div>
              <div className="flex-1">
                <div className="bg-gradient-to-br from-[#54585A]/30 to-black/50 backdrop-blur-sm p-12 rounded-3xl border border-white/10">
                  <div className="bg-black/50 rounded-2xl p-8 border border-[#CC0633]/30">
                    <div className="space-y-4">
                      <div className="h-4 bg-[#CC0633]/30 rounded w-3/4"></div>
                      <div className="h-4 bg-[#CC0633]/20 rounded w-1/2"></div>
                      <div className="h-12 bg-[#CC0633] rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold">Sign Up</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="step-card flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="flex-1">
                <div className="inline-block bg-[#CC0633] text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  2
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Browse or List Items</h3>
                <p className="text-gray-400 text-lg">
                  Explore thousands of listings from textbooks to electronics, or create your own listing in seconds with photos and descriptions.
                </p>
              </div>
              <div className="flex-1">
                <div className="bg-gradient-to-br from-[#54585A]/30 to-black/50 backdrop-blur-sm p-12 rounded-3xl border border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-black/50 rounded-xl p-4 border border-[#CC0633]/30">
                        <div className="h-24 bg-[#CC0633]/20 rounded-lg mb-3"></div>
                        <div className="h-3 bg-[#CC0633]/30 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-[#CC0633]/20 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="step-card flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="inline-block bg-[#CC0633] text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  3
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Connect & Trade</h3>
                <p className="text-gray-400 text-lg">
                  Message sellers, arrange meetups on campus, and complete your transaction safely. Build your reputation within the community.
                </p>
              </div>
              <div className="flex-1">
                <div className="bg-gradient-to-br from-[#54585A]/30 to-black/50 backdrop-blur-sm p-12 rounded-3xl border border-white/10">
                  <div className="bg-black/50 rounded-2xl p-8 border border-[#CC0633]/30 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#CC0633] rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-[#CC0633]/30 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-[#CC0633]/20 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 justify-end">
                      <div className="flex-1 text-right">
                        <div className="h-3 bg-[#A6192E]/30 rounded w-3/4 mb-2 ml-auto"></div>
                        <div className="h-3 bg-[#A6192E]/20 rounded w-1/2 ml-auto"></div>
                      </div>
                      <div className="w-12 h-12 bg-[#A6192E] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-32 bg-gradient-to-b from-black to-[#54585A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              Join the <span className="text-[#CC0633]">Movement</span>
            </h2>
            <p className="text-xl text-gray-400">Be part of SFU's fastest-growing marketplace</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="stat-number text-center p-8">
              <div className="text-6xl font-bold text-[#CC0633] mb-2">2,500+</div>
              <div className="text-xl text-gray-400">Active Students</div>
            </div>
            <div className="stat-number text-center p-8">
              <div className="text-6xl font-bold text-[#CC0633] mb-2">10,000+</div>
              <div className="text-xl text-gray-400">Items Listed</div>
            </div>
            <div className="stat-number text-center p-8">
              <div className="text-6xl font-bold text-[#CC0633] mb-2">95%</div>
              <div className="text-xl text-gray-400">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="py-32 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ready to Start <span className="text-[#CC0633]">Trading</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Join thousands of SFU students already using the marketplace. Create your account today and discover endless possibilities.
          </p>
          <a
            href="/login"
            className="inline-block bg-[#CC0633] hover:bg-[#A6192E] text-white px-12 py-5 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#CC0633]/50"
          >
            Get Started for Free
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}