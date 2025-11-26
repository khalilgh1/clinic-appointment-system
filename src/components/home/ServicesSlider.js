"use client"; // client component
import React from "react";
import TitleBlock from "./TitleBlock";
import ServiceCard from "./ServiceCard";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi2";


// Slider navigation button
function SliderButton({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        backgroundColor: "#fff",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        flexShrink: 0, // ensures button doesn't shrink
      }}
    >
      {direction === "left" ? (
        <HiOutlineArrowLeft size={24} color="var(--color-primary)" />
      ) : (
        <HiOutlineArrowRight size={24} color="var(--color-primary)" />
      )}
    </button>
  );
}

export default function ServicesSlider() {
  const servicesData = [
    {
      icon: "/home/icon1.png",
      title: "Accompagnement Psychologique",
      description:
        "Approche conjointe homme/femme, accompagnement nutritionnel et psychologique.",
    },
    {
      icon: "/home/icon2.png",
      title: "Préservation de la Fertilité",
      description: "Conservation d'ovocytes, spermatozoïdes et embryons pour vos projets futurs.",
    },
    {
      icon: "/home/icon3.png",
      title: "Imagerie & Laboratoire",
      description: "Équipements de dernière génération : bloc laboratoire PMA.",
    },
    {
      icon: "/home/icon4.png",
      title: "Bilan Complet de Fertilité",
      description: "Examens approfondis pour évaluer votre fertilité : spermogramme, dosages hormonaux, échographies. ",
    },
    {
      icon: "/home/icon5.png",
      title: "Fertilité & PMA",
      description: "FIV, ICSI, IIU, stimulation ovarienne, préserovocytaire et spermatique.",
    },
    {
      icon: "/home/icon6.png",
      title: "Chirurgie Mini-Invasive",
      description: "Traitement chirurgical de l'endométriose, fibromes utérins et kystes ovariens.",
    },
    {
      icon: "/home/icon7.png",
      title: "Consultations Spécialisées",
      description: "Consultations avec nos gynécologues, endocrinologues et urologues spécialisés .",
    },
  ];//

  const sliderRef = React.useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const scrollAmount = 420; // adjust to card width + gap
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section style={{ padding: "4rem 2rem" }}>
      <TitleBlock
        titleStart="Découvrez notre"
        titleEnd="gamme de services de santé"
        description="Nous offrons un large choix de solutions de santé, incluant le conseil, le diagnostic, la télémédecine, la rééducation et les consultations d’experts."
      />

      {/* Slider row with buttons and cards */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          marginTop: "3rem",
        }}
      >
        {/* Left button */}
        <SliderButton direction="left" onClick={() => scroll("left")} />

        {/* Cards container */}
        <div
          ref={sliderRef}
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "hidden",
            scrollBehavior: "smooth",
            flexWrap: "nowrap",
            width: "1243px", // 3 cards width + gaps
          }}
        >
          {servicesData.map((service, index) => (
            <div key={index} style={{ flex: "0 0 auto" }}>
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </div>
          ))}
        </div>

        {/* Right button */}
        <SliderButton direction="right" onClick={() => scroll("right")} />
      </div>
    </section>
  );
}
