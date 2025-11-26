"use client";
import React from "react";
import TitleBlock from "./TitleBlock";

// Single review card
function ReviewCard({ text, author }) {
  return (
    <div
      style={{
        width: "365.33px",
        height: "181.8px",
        backgroundColor: "#F5F7F8",
        borderRadius: "24px",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // centers both review + name vertically
        boxSizing: "border-box",
      }}
    >
      <p
        style={{
          fontSize: "16px",
          color: "#010B0C",
          fontFamily: "Roboto, sans-serif",
          margin: 0,
          textAlign: "left",
        }}
      >
        {text}
      </p>

      <span
        style={{
          fontSize: "14px",
          color: "#064045",
          fontFamily: "Roboto, sans-serif",
          fontWeight: 700,
          textAlign: "left",
          marginTop: "0.6rem", // subtle spacing
        }}
      >
        {author}
      </span>
    </div>
  );
}


// Reviews Section
export default function ReviewsSection() {
  const reviews = [
    {
      text: "Un accompagnement humain, des médecins à l'écoute et des résultats au rendez-vous. Merci à toute l'équipe !",
      author: "— Sofia & Karim",
    },
    {
      text: "FERTIVAL nous a redonné espoir. Nous sommes aujourd'hui parents d'une petite fille grâce à eux.",
      author: "— Nesrine & Amine",
    },
    {
      text: "Professionnalisme, bienveillance et transparence. Je recommande vivement.",
      author: "— Lamia",
    },
  ];

  return (
    <section style={{ padding: "4rem 2rem", textAlign: "center" }}>
      <TitleBlock
        titleStart="Ce que nos patients"
        titleEnd="disent de nous"
        description="" // no description
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginTop: "3rem",
          height: "181.8px", // to match card height
        }}
      >
        {reviews.map((review, index) => (
          <ReviewCard key={index} text={review.text} author={review.author} />
        ))}
      </div>
    </section>
  );
}
