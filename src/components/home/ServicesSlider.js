"use client";

import React, { useEffect, useState, useRef } from "react";
import TitleBlock from "./TitleBlock";
import ServiceCard from "./ServiceCard";
import {supabase} from "@/lib/supabase/client";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi2";

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
        flexShrink: 0,
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
  const [services, setServices] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("service")
        .select("*")
        .eq("is_active", true);

      if (!error) setServices(data);
    };

    fetchServices();
  }, []);

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const amount = 420;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          marginTop: "3rem",
        }}
      >
        <SliderButton direction="left" onClick={() => scroll("left")} />

        <div
          ref={sliderRef}
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "hidden",
            scrollBehavior: "smooth",
            flexWrap: "nowrap",
            width: "1243px",
          }}
        >
          {services.map((service) => (
            <div key={service.service_id} style={{ flex: "0 0 auto" }}>
              <ServiceCard
                icon={service.icon}
                title={service.name}
                description={service.description}
              />
            </div>
          ))}
        </div>

        <SliderButton direction="right" onClick={() => scroll("right")} />
      </div>
    </section>
  );
}
