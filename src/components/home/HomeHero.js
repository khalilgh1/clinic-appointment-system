"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";

export default function HomeHero() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024 && window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section
      style={{
        fontFamily: 'Roboto, sans-serif',
        backgroundColor: 'var(--color-primary)',
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '1rem' : '2rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          maxWidth: '1200px',
          gap: isMobile ? '2rem' : '3rem',
          width: '100%',
          padding: isMobile ? '1.5rem' : '2rem',
          borderRadius: '24px',
        }}
      >
        {/* Left text content */}
        <div style={{ flex: 1, width: '100%', order: isMobile ? 2 : 1 }}>
          <h1 style={{ 
            fontSize: isMobile ? '32px' : isTablet ? '48px' : '68px', 
            lineHeight: '1.1', 
            margin: 0 
          }}>
            <span style={{ fontFamily: 'var(--font-pacifico)', color: 'var(--color-secondary)' }}>
              Solutions de santé modernes
            </span>{' '}
            qui vous placent au centre.
          </h1>

          <p style={{ 
            fontSize: isMobile ? '16px' : '18px', 
            marginTop: '1.5rem', 
            color: '#fff' 
          }}>
            Des bilans de routine aux traitements spécialisés, nous allions technologie moderne et approche humaine pour préserver la santé de vos proches.
          </p>

          {/* Appointment button */}
          <Link href="/MedicalBooking" passHref>
            <button
              style={{
                marginTop: '2rem',
                fontSize: isMobile ? '16px' : '20px',
                color: 'var(--color-primary)',
                backgroundColor: '#fff',
                padding: isMobile ? '0.6rem 1.5rem' : '0.8rem 2rem',
                border: 'none',
                borderRadius: '999px',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              Prendre rendez-vous
              <span
                style={{
                  width: isMobile ? '28px' : '32px',
                  height: isMobile ? '28px' : '32px',
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <HiOutlineArrowRight color="#fff" size={isMobile ? 18 : 20} />
              </span>
            </button>
          </Link>
        </div>

        {/* Right image */}
        <div style={{ 
          flex: 1, 
          width: '100%', 
          order: isMobile ? 1 : 2,
          maxWidth: isMobile ? '100%' : 'none'
        }}>
          <img
            src="/doctor.png"
            alt="Doctor"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: isMobile ? '300px' : 'none',
              borderRadius: '24px',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </section>
  );
}
