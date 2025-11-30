"use client";
import React from "react";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";

export default function HomeHero() {
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
        padding: '2rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          maxWidth: '1200px',
          gap: '3rem',
          width: '100%',
          padding: '2rem',
          borderRadius: '24px', // rounded corners of main green card
        }}
      >
        {/* Left text content */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '68px', lineHeight: '1.1', margin: 0 }}>
            <span style={{ fontFamily: 'var(--font-pacifico)', color: 'var(--color-secondary)' }}>
              Solutions de santé modernes
            </span>{' '}
            qui vous placent au centre.
          </h1>

          <p style={{ fontSize: '18px', marginTop: '1.5rem', color: '#fff' }}>
            Des bilans de routine aux traitements spécialisés, nous allions technologie moderne et approche humaine pour préserver la santé de vos proches.
          </p>

          {/* Appointment button */}
          <Link href="/MedicalBooking" passHref>
            <button
              style={{
                marginTop: '2rem',
                fontSize: '20px',
                color: 'var(--color-primary)', // green text
                backgroundColor: '#fff', // white background
                padding: '0.8rem 2rem',
                border: 'none',
                borderRadius: '999px', // fully rounded
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
                  width: '32px',
                  height: '32px',
                  backgroundColor: 'var(--color-primary)', // green circle
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <HiOutlineArrowRight color="#fff" size={20} />
              </span>
            </button>
          </Link>
        </div>

        {/* Right image */}
        <div style={{ flex: 1 }}>
          <img
            src="/doctor.png"
            alt="Doctor"
            style={{
              width: '100%',
              borderRadius: '24px', // rounded corners
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </section>
  );
}
