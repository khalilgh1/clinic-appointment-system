"use client";

import React, { useEffect, useState } from "react";
import TitleBlock from "./TitleBlock";
import DoctorCard from "./DoctorCard";
import { HiOutlineArrowRight } from "react-icons/hi2";
import {supabase} from "@/lib/supabase/client"; // your supabase client

export default function DoctorsSection() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data, error } = await supabase
        .from("doctor")
        .select("*")
        .eq("is_active", true) // only active doctors
        .limit(4); // only first 4

      if (error) {
        console.error("Error fetching doctors:", error);
      } else {
        setDoctors(data);
      }
      setLoading(false);
    };

    fetchDoctors();
  }, []);

  if (loading) return <p>Loading doctors...</p>;

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
        {doctors.map((doc) => (
          <DoctorCard
            key={doc.doctor_id}
            photo={doc.profile_picture || "/doctor.png"} // fallback image
            name={doc.name}
            specialty={doc.specialty_name}
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
