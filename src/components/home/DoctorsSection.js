"use client";
import React from "react";
import TitleBlock from "./TitleBlock";
import DoctorCard from "./DoctorCard";
import { HiOutlineArrowRight } from "react-icons/hi2";

export default function DoctorsSection() {
  const doctorsData = [
    {
      photo: "/home/doctor1.png",
      name: "Dr Nadir Kedji",
      specialty: "Gynécologue obstétricien",
      description: "Expert PMA - 20+ ans",
    },
    {
      photo: "/home/doctor2.png",
      name: "Dr Sadat Nesrine",
      specialty: "Spécialiste en fertilité",
      description: "Approche personnalisée",
    },
    {
      photo: "/home/doctor3.png",
      name: "Dr Mourad Semrouni",
      specialty: "Endocrinologue",
      description: "Troubles hormonaux",
    },
    {
      photo: "/home/doctor4.png",
      name: "Dr Bouchra Rezig",
      specialty: "Médecin nutritionniste",
      description: "Accompagnement nutrition",
    },
  ];

  return (
    <section style={{ padding: "4rem 2rem", textAlign: "center" }}>
      <TitleBlock
        titleStart="Rencontrez notre"
        titleEnd="équipe d’experts"
        description="Notre équipe est composée de professionnels de santé dévoués, de rédacteurs médicaux et d’experts en technologie qui travaillent sans relâche pour créer et sélectionner un contenu fiable et fondé sur des preuves."
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
          marginTop: "3rem",
        }}
      >
        {doctorsData.map((doc, index) => (
          <DoctorCard
            key={index}
            photo={doc.photo}
            name={doc.name}
            specialty={doc.specialty}
            description={doc.description}
          />
        ))}
      </div>

      {/* Button to see all doctors */}
      <div
        style={{
          marginTop: "3rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button
          style={{
            backgroundColor: "var(--color-primary)",
            color: "#fff",
            fontSize: "18px",
            fontFamily: "Roboto, sans-serif",
            padding: "0.8rem 1.5rem",
            border: "none",
            borderRadius: "999px", // fully rounded
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          Voir tous les médecins
          <span
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "#fff",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HiOutlineArrowRight color="var(--color-primary)" size={20} />
          </span>
        </button>
      </div>
    </section>
  );
}
