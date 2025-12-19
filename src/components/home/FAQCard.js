"use client";
import React, { useState, useEffect } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";

export default function FAQCard({ question, answer }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "880px",
        backgroundColor: "#F5F7F8",
        borderRadius: "24px",
        padding: "clamp(16px, 3vw, 20px) clamp(18px, 3vw, 24px)",
        margin: "12px auto",
        cursor: "pointer",
        boxSizing: "border-box",
      }}
      onClick={() => setOpen(!open)}
    >
      {/* Question row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <h3
          style={{
            fontSize: "clamp(14px, 2vw, 16px)",
            fontWeight: "700",
            color: "#010B0C",
            margin: 0,
            flex: 1,
          }}
        >
          {question}
        </h3>

        {/* Toggle button */}
        <div
          style={{
            width: "clamp(28px, 4vw, 32px)",
            height: "clamp(28px, 4vw, 32px)",
            borderRadius: "50%",
            backgroundColor: open ? "#0A8A7B" : "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            flexShrink: 0,
          }}
        >
          {open ? (
            <HiMinus size={isMobile ? 18 : 20} color="#FFFFFF" />
          ) : (
            <HiPlus size={isMobile ? 18 : 20} color="#0A8A7B" />
          )}
        </div>
      </div>

      {/* Answer */}
      {open && (
        <p
          style={{
            marginTop: "12px",
            fontSize: "clamp(14px, 2vw, 16px)",
            color: "#555",
            lineHeight: "1.4",
          }}
        >
          {answer}
        </p>
      )}
    </div>
  );
}
