/**
 * Main Footer Component
 * 
 * Assembles the footer section of the application.
 * It integrates the logo, quick links, services list, and contact information
 * into a cohesive layout, along with the copyright notice.
 */
"use client";
import React from 'react';
import FooterLogo from './FooterLogo';
import FooterQuickLinks from './FooterQuickLinks';
import FooterServices from './FooterServices';
import FooterContact from './FooterContact';

export default function Footer() {
  return (
    <footer className="bg-[#064045] text-white ">
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-25 2xl:px-20 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {/* Logo & Description */}
          <FooterLogo />

          {/* Quick Links */}
          <FooterQuickLinks />

          {/* Services */}
          <FooterServices />

          {/* Contact */}
          <FooterContact />
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <p className="text-center text-sm text-white/70">
            Copyright © FERTIVAL {new Date().getFullYear()}
          </p>
        </div>
      </div>
      
    </footer>
  );
}