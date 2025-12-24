/**
 * 404 Not Found Page
 * 
 * Custom error page displayed when a user visits a non-existent route.
 * It features a friendly illustration and a button to guide the user back to the homepage.
 */
"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <div className="min-h-screen flex">
        {/* Left Section - Image with Primary Background */}
        <div 
          className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <div className="relative w-full max-w-lg">
            <Image
              src="/Seeker.png"
              alt="404 Illustration"
              width={600}
              height={600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Right Section - Error Message with White Background */}
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 lg:p-12">
          <div className="flex flex-col items-center text-center max-w-lg">
            <h1 
              className="text-8xl sm:text-9xl lg:text-[10rem] font-bold mb-2"
              style={{ 
                fontFamily: 'var(--font-pacifico), cursive',
                color: 'var(--color-secondary)'
              }}
            >
              404
            </h1>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 mb-2">
              OOOps!
            </h2>
            
            <h3 className="text-3xl sm:text-4xl lg:text-5xl text-gray-700 mb-4">
              Page Not Found
            </h3>
            
            <p className="text-base sm:text-lg text-gray-500 mb-8 max-w-md">
              This page doesn't exist or was removed! We suggest you back to home.
            </p>
            
            <Link href="/">
              <button
                className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                style={{ 
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-secondary)'
                }}
              >
                Back to homepage
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

