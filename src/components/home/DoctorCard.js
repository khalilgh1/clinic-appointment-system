"use client";
import React from "react";


export default function DoctorCard({ photo, name, specialty, description }) {
  return (
    <div
      style={{
        width: "272px",
        height: "266px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "0.5rem", // spacing between elements
      }}
    >
      {/* Doctor photo */}
      <div
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          overflow: "hidden",
          marginBottom: "0.5rem",
        }}
      >
        <img
          src={photo}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: "Roboto, sans-serif",
          fontSize: "18px",
          fontWeight: 700,
          color: "#010B0C",
          margin: 0,
        }}
      >
        {name}
      </h3>

      {/* Specialty */}
      <p
        style={{
          fontFamily: "Roboto, sans-serif",
          fontSize: "14px",
          color: "var(--color-primary)", // green
          margin: "0.2rem 0",
        }}
      >
        {specialty}
      </p>

      {/* Short description */}
      <p
        style={{
          fontFamily: "Roboto, sans-serif",
          fontSize: "12px",
          color: "#707677",
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}
