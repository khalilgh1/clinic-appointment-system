"use client";

import { useState } from "react";
import Link from "next/link";

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
  // Safely parse JSONB fields
  const parseJsonField = (field) => {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    if (typeof field === 'string') {
      try {
        const parsed = JSON.parse(field);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  const exams = parseJsonField(service.exams);
  const equipments = parseJsonField(service.equipments);
  const procedures = parseJsonField(service.procedures);
  const advantages = parseJsonField(service.advantages);

  // Build tabs
  const allTabs = [
    { id: "exams", label: "Examens", content: exams },
    { id: "equipments", label: "Équipements", content: equipments },
    { id: "procedures", label: "Procédures", content: procedures },
    { id: "advantages", label: "Avantages", content: advantages },
  ];

  const availableTabs = allTabs.filter(tab => tab.content.length > 0);
  const [activeTab, setActiveTab] = useState(availableTabs[0]?.id || "exams");

  const getActiveContent = () => {
    return availableTabs.find(tab => tab.id === activeTab)?.content || [];
  };

  // Split service name
  const serviceName = service.name || "";
  const hasAmpersand = serviceName.includes("&");
  
  let firstPart = "";
  let secondPart = "";
  
  if (hasAmpersand) {
    // If name contains "&", split by "&"
    const splitName = serviceName.split("&");
    firstPart = splitName[0]?.trim() || "";
    secondPart = splitName[1]?.trim() || "";
  } else {
    // If name doesn't contain "&", take last two words and make them yellow
    const words = serviceName.trim().split(/\s+/);
    if (words.length > 2) {
      // More than 2 words: last two words are yellow
      const lastTwoWords = words.slice(-2).join(" ");
      firstPart = words.slice(0, -2).join(" ");
      secondPart = lastTwoWords;
    } else if (words.length === 2) {
      // Exactly 2 words: only the last word is yellow
      firstPart = words[0];
      secondPart = words[1];
    } else {
      // 1 word or less: no yellow part
      firstPart = serviceName;
      secondPart = "";
    }
  }

  // Get section title
  const getSectionTitle = () => {
    switch (activeTab) {
      case "exams":
        return "Types d'examens";
      case "equipments":
        return "Équipements disponibles";
      case "procedures":
        return "Procédures et techniques";
      case "advantages":
        return "Avantages";
      default:
        return "Informations";
    }
  };

  // Check if content has categories
  const hasCategories = (content) => {
    return content.length > 0 && 
           content[0] && 
           typeof content[0] === 'object' && 
           content[0].category;
  };

  // Render table format for exams
  const renderTableContent = () => {
    const content = getActiveContent();
    
    if (content.length === 0) {
      return (
        <p className="text-gray-500 text-center py-8">
          Aucune information disponible
        </p>
      );
    }

    // Table format for exams with categories
    if (hasCategories(content)) {
      return (
        // Wrap the table so rounded corners clip the table edges
        <div className="overflow-x-auto rounded-3xl border border-gray-100">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-4 px-6 font-bold  text-gray-600 uppercase tracking-wider first:rounded-tl-3xl last:rounded-tr-3xl">
                  Spécialités
                </th>
                <th className="text-left py-4 px-6 font-bold text-gray-600 uppercase tracking-wider first:rounded-tl-3xl last:rounded-tr-3xl">
                  Examens
                </th>
              </tr>
            </thead>
            <tbody>
              {content.map((item, idx) => {
                const isLast = idx === content.length - 1;
                return (
                  <tr 
                    key={idx} 
                    className="bg-white border-b border-gray-100 last:border-b-0"
                  >
                    <td className={`py-5 px-6 font-semibold text-[#0f3c46] align-top w-1/4 ${isLast ? 'rounded-bl-3xl' : ''}`}>
                      {item.category}
                    </td>
                    <td className={`py-5 px-6 text-gray-600 leading-relaxed ${isLast ? 'rounded-br-3xl' : ''}`}>
                      {item.items}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    // List format for other tabs
    return (
      <div className="space-y-4">
        {content.map((item, idx) => {
          const text = typeof item === 'string' ? item : item.items || '';
          return (
            <div key={idx} className="bg-gray-50 rounded-xl p-5 text-gray-700 leading-relaxed">
              {text}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9]">
      {/* HERO SECTION */}
  <div className="relative w-full h-[360px] md:h-[420px] lg:h-[600px] overflow-hidden">
        {service.image && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${service.image}')`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-[#0f3c46] opacity-85" />

  <div className="relative h-full max-w-[1100px] mx-auto px-4 md:px-6 lg:px-8 flex flex-col justify-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-pacifico)' }}>
            {firstPart}
            {secondPart && (
              <>
                {hasAmpersand ? " & " : " "}
                <span className="text-[#fce57e]">{secondPart}</span>
              </>
            )}
          </h1>

          <p className="max-w-3xl text-base md:text-lg text-gray-100 leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>

      {/* MAIN CONTENT SECTION - FULL WIDTH */}
  <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN - Main Content (Extreme Left) */}
          <div className="lg:col-span-8">
            {availableTabs.length > 0 ? (
              <div className="bg-white rounded-3xl shadow-sm overflow-hidden h-full">
                {/* Tabs Navigation */}
                <div className="border-b border-gray-200">
                  <nav className="flex overflow-x-auto">
                    {availableTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                          relative px-6 py-4 text-sm md:text-base font-medium whitespace-nowrap
                          transition-colors
                          ${activeTab === tab.id 
                            ? 'text-[#0f3c46]' 
                            : 'text-gray-500 hover:text-gray-700'
                          }
                        `}
                      >
                        {tab.label}
                        {activeTab === tab.id && (
                          <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#0f3c46]" />
                        )}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6 md:p-8 lg:p-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0f3c46] mb-8">
                    {getSectionTitle()}
                  </h2>

                  {renderTableContent()}

                  {/* Price and Duration */}
                  {(service.price > 0 || service.duration_min) && (
                    <div className="mt-12 pt-8 border-t border-gray-200">
                      <div className="flex flex-wrap gap-8 text-sm">
                        {service.price > 0 && (
                          <div>
                            <span className="text-gray-500 font-medium">Prix: </span>
                            <span className="text-[#0f3c46] font-bold text-lg">
                              {service.price} DZD
                            </span>
                          </div>
                        )}
                        {service.duration_min && (
                          <div>
                            <span className="text-gray-500 font-medium">Durée: </span>
                            <span className="text-[#0f3c46] font-bold text-lg">
                              {service.duration_min} min
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0f3c46] mb-6">
                  À propos
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {service.description}
                </p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - Sidebar (Extreme Right) */}
          <div className="lg:col-span-4">
            <div className="sticky top-6 space-y-6">
            
            {/* Opening Hours Card */}
            <div className="bg-[#0f3c46] rounded-3xl p-8 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <ClockIcon className="w-7 h-7 text-[#fce57e]" />
                <h3 className="text-lg font-bold">Horaires d'ouverture</h3>
              </div>

              <div className="mb-8">
                <p className="text-gray-300 text-sm mb-2">Du Samedi à Jeudi</p>
                <p className="text-2xl font-bold tracking-wide">07:00 - 21:00</p>
              </div>

              <Link href="/MedicalBooking" className="block">
                <button className="w-full bg-[#fce57e] hover:bg-[#f5dc6b] text-[#0f3c46] font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95">
                  Prendre Rendez-Vous
                </button>
              </Link>
            </div>

            {/* Help Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#0f3c46] mb-6">
                Besoin d'aide ?
              </h3>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Téléphone
                  </p>
                  <a
                    href="tel:+213XXXXXXXXX"
                    className="text-lg font-semibold text-[#0f3c46] hover:text-[#256c7a] transition-colors"
                  >
                    +213 XXX XXX XXX
                  </a>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Email
                  </p>
                  <a
                    href="mailto:contact@fertival.dz"
                    className="text-lg font-semibold text-[#0f3c46] hover:text-[#256c7a] transition-colors break-all"
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
    </div>
  );
}