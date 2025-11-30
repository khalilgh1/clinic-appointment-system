"use client";

import HomeHero from "../../components/home/HomeHero";
import InfosSection from "../../components/home/InfosSection";
import ServicesSlider from "../../components/home/ServicesSlider";
import DoctorsSection from "../../components/home/DoctorsSection";
import ReviewsSection from "../../components/home/ReviewsSection";
import QuestionsSection from "@/components/home/QuestionsSection";


export default function HomePage() {
  return (
    <>
       <HomeHero /> 
       <InfosSection /> 
      <ServicesSlider /> 
       <DoctorsSection /> 
       <ReviewsSection />
        <QuestionsSection />
    </>
  );
}