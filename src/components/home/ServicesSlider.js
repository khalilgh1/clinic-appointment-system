"use client";

import React, { useEffect, useState, useRef } from "react";
import TitleBlock from "./TitleBlock";
import ServiceCard from "./ServiceCard";
import {supabase} from "@/lib/supabase/client";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi2";

function SliderButton({ direction, onClick }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <button
      onClick={onClick}
      style={{
        width: "clamp(40px, 5vw, 48px)",
        height: "clamp(40px, 5vw, 48px)",
        borderRadius: "50%",
        backgroundColor: "#fff",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        flexShrink: 0,
        zIndex: 10,
      }}
    >
      {direction === "left" ? (
        <HiOutlineArrowLeft size={isMobile ? 20 : 24} color="var(--color-primary)" />
      ) : (
        <HiOutlineArrowRight size={isMobile ? 20 : 24} color="var(--color-primary)" />
      )}
    </button>
  );
}

export default function ServicesSlider() {
  const [services, setServices] = useState([]);
  const [showButtons, setShowButtons] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase()
        .from("service")
        .select("*")
        .eq("is_active", true);

      if (!error) setServices(data);
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const checkScreenSize = () => setShowButtons(window.innerWidth >= 640);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.querySelector('div')?.offsetWidth || 420;
    const amount = cardWidth + 16; // card width + gap
    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section style={{ padding: "clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)" }}>
      <TitleBlock
        titleStart="Découvrez notre"
        titleEnd="gamme de services de santé"
        description="Nous offrons un large choix de solutions de santé, incluant le conseil, le diagnostic, la télémédecine, la rééducation et les consultations d'experts."
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(8px, 2vw, 16px)",
          marginTop: "3rem",
          position: "relative",
          width: "100%",
        }}
      >
        {showButtons && (
          <SliderButton direction="left" onClick={() => scroll("left")} />
        )}

        <div
          ref={sliderRef}
          className="no-scrollbar"
          style={{
            display: "flex",
            gap: "clamp(12px, 2vw, 16px)",
            overflowX: "auto",
            overflowY: "hidden",
            scrollBehavior: "smooth",
            flexWrap: "nowrap",
            width: "100%",
            maxWidth: "1243px",
            padding: "0 8px",
          }}
        >
          {services.map((service) => (
            <div key={service.service_id} style={{ flex: "0 0 auto" }}>
              <ServiceCard
                icon={service.icon}
                title={service.name}
                description={service.description}
                id ={service.service_id}
              />
            </div>
          ))}
        </div>

        {showButtons && (
          <SliderButton direction="right" onClick={() => scroll("right")} />
        )}
      </div>
    </section>
  );
}
