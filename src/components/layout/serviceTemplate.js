"use client";

import { useState } from "react";


const ClockIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default function ServiceTemplate({ service }) {
  const [activeTab, setActiveTab] = useState("exams");

  const exams = Array.isArray(service.exams) ? service.exams : [];
  const equipments = Array.isArray(service.equipments) ? service.equipments : [];
  const advantages = Array.isArray(service.advantages) ? service.advantages : [];
  const procedures = Array.isArray(service.procedures) ? service.procedures : [];


  const tabs = [
    { id: "exams", label: "Examens", content: exams },
    { id: "equipments", label: "Équipements", content: equipments },
    { id: "advantages", label: "Avantages", content: advantages },
    { id: "procedures", label: "Procédures", content: procedures },
  ];

  const activeContent = tabs.find((t) => t.id === activeTab)?.content || [];

 
  const [title1, title2] = (service.name || "").split("&");

  return (
    <div className="min-h-screen bg-[#F4F7F9] font-sans">
      
      {/* ---------------------- HERO SECTION ---------------------- */}
      <div className="relative w-full h-[400px] overflow-hidden bg-[#0f3c46]">
        
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0f3c46] via-[#0f3c46]/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center text-white">
          <div className="mb-6">
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-1.5 rounded-full text-sm font-medium">
              {service.category || "Service"}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {title1}
            {title2 && <span className="text-[#fce57e]"> & {title2}</span>}
          </h1>

          <p className="max-w-2xl text-lg text-gray-200 opacity-90 leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>

      {/* ---------------------- MAIN CONTENT ---------------------- */}
      <div className="max-w-7xl mx-auto px-6 py-12 -mt-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* ---------------- LEFT MAIN COLUMN ---------------- */}
          <div className="flex-1">

            {/* TABS HEADER */}
            <div className="bg-white rounded-t-xl p-2 border-b border-gray-100">
              <div className="flex gap-8 px-6 pt-4 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 text-lg font-medium transition-colors relative whitespace-nowrap ${
                      activeTab === tab.id
                        ? "text-[#0f3c46]"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0f3c46] rounded-t-full"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB CONTENT */}
            <div className="bg-white rounded-b-xl shadow-sm p-8 min-h-[400px]">
              
              {/* Section Title */}
              <h2 className="text-2xl font-bold text-[#0f3c46] mb-8">
                {activeTab === "equipments"
                  ? "Équipements disponibles"
                  : activeTab === "advantages"
                  ? "Avantages"
                  : activeTab === "procedures"
                  ? "Procédures associées"
                  : "Examens disponibles"}
              </h2>

              {/* ---------------- GENERIC LIST FOR ALL SECTIONS ---------------- */}
              <ul className="space-y-4">
                {activeContent.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-gray-800">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#0f3c46]" />
                    <span className="text-[15px] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* ---------------- PRICE & DURATION ---------------- */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex gap-6 text-sm text-gray-500">
                <p>
                  <strong className="text-gray-900">Prix:</strong>{" "}
                  {service.price} DZD
                </p>
                <p>
                  <strong className="text-gray-900">Durée:</strong>{" "}
                  {service.duration_min} min
                </p>
              </div>
            </div>
          </div>

          {/* ---------------- RIGHT SIDEBAR ---------------- */}
          <div className="w-full lg:w-[350px] flex flex-col gap-6">

            {/* Opening hours card */}
            <div className="bg-[#0f3c46] rounded-2xl p-8 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <ClockIcon className="w-6 h-6 text-[#fce57e]" />
                <h3 className="text-xl font-bold">Horaires d'ouverture</h3>
              </div>

              <div className="space-y-2 mb-8">
                <p className="text-gray-300 text-sm">Du Samedi à Jeudi</p>
                <p className="text-2xl font-semibold tracking-wide">
                  07:00 - 21:00
                </p>
              </div>

              <button className="w-full bg-[#fce57e] hover:bg-[#ebd574] text-[#0f3c46] font-bold py-3.5 px-4 rounded-xl transition-colors">
                Prendre Rendez-Vous
              </button>
            </div>

            {/* Help card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#0f3c46] mb-6">
                Besoin d'aide ?
              </h3>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Téléphone
                  </p>
                  <a
                    href="tel:+2130000000"
                    className="text-lg font-medium text-[#0f3c46] hover:text-[#256c7a]"
                  >
                    +213 XXX XXX XXX
                  </a>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:contact@fertival.dz"
                    className="text-lg font-medium text-[#0f3c46] hover:text-[#256c7a]"
                  >
                    contact@fertival.dz
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
