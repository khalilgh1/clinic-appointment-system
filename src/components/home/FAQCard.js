"use client";
import React, { useState } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";

export default function FAQCard({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        width: "880px",
        backgroundColor: "#F5F7F8",
        borderRadius: "24px",
        padding: "20px 24px",
        margin: "12px auto",
        cursor: "pointer",
      }}
      onClick={() => setOpen(!open)}
    >
      {/* Question row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "700",
            color: "#010B0C",
            margin: 0,
          }}
        >
          {question}
        </h3>

        {/* Toggle button */}
        <div
          style={{
            width: "32px",
            height: "32px",
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
            <HiMinus size={20} color="#FFFFFF" />
          ) : (
            <HiPlus size={20} color="#0A8A7B" />
          )}
        </div>
      </div>

      {/* Answer */}
      {open && (
        <p
          style={{
            marginTop: "12px",
            fontSize: "16px",
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
