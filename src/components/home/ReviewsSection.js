"use client";
import React from "react";
import TitleBlock from "./TitleBlock";

// Single review card
function ReviewCard({ text, author }) {
  return (
    <div
      style={{
        width: "100%",
        minWidth: "280px",
        maxWidth: "365.33px",
        minHeight: "181.8px",
        backgroundColor: "#F5F7F8",
        borderRadius: "24px",
        padding: "clamp(1.5rem, 4vw, 2rem)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <p
        style={{
          fontSize: "clamp(14px, 2vw, 16px)",
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
          fontSize: "clamp(13px, 1.8vw, 14px)",
          color: "#064045",
          fontFamily: "Roboto, sans-serif",
          fontWeight: 700,
          textAlign: "left",
          marginTop: "0.6rem",
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
    <section style={{ padding: "clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)", textAlign: "center" }}>
      <TitleBlock
        titleStart="Ce que nos patients"
        titleEnd="disent de nous"
        description="" // no description
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "clamp(1rem, 3vw, 2rem)",
          marginTop: "3rem",
          alignItems: "stretch",
        }}
      >
        {reviews.map((review, index) => (
          <ReviewCard key={index} text={review.text} author={review.author} />
        ))}
      </div>
    </section>
  );
}
