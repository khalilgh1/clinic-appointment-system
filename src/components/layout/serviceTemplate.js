"use client";

import { useState } from "react";

export default function ServiceTemplate({ service }) {
  const [activeTab, setActiveTab] = useState("exams");

  const tabs = [
    { id: "exams", label: "Exams", content: service.exams },
    { id: "equipments", label: "Equipments", content: service.equipments },
    { id: "advantages", label: "Advantages", content: service.advantages },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="relative bg-green-700 rounded-lg overflow-hidden h-64 flex items-center justify-center text-white mb-6">
        <h1 className="text-4xl font-bold">{service.name}</h1>
        <p className="absolute bottom-4 left-6 text-lg">{service.description}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1 bg-white rounded shadow p-6">
          <div className="mb-4 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 font-semibold ${
                  activeTab === tab.id ? "border-b-2 border-green-600 text-green-600" : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <ul className="mt-4 space-y-2">
            {tabs.find((t) => t.id === activeTab)?.content?.map((item, idx) => (
              <li key={idx} className="text-gray-700">- {item}</li>
            ))}
            {activeTab === "exams" && service.procedures?.length > 0 && (
              <>
                <h3 className="mt-4 font-semibold text-gray-900">Procedures:</h3>
                <ul className="list-disc list-inside">
                  {service.procedures.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </>
            )}
          </ul>

          <div className="mt-6">
            <p><strong>Price:</strong> {service.price} DZD</p>
            <p><strong>Duration:</strong> {service.duration_min} minutes</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-64 bg-green-50 rounded shadow p-6 flex flex-col gap-6">
          <div>
            <h3 className="font-bold text-green-700 mb-2">Opening Hours</h3>
            <p>Saturday to Thursday</p>
            <p className="font-semibold text-green-700">07:00 - 21:00</p>
            <button className="mt-2 w-full bg-yellow-400 text-green-900 font-bold py-2 rounded">
              Prendre Rendez-Vous
            </button>
          </div>
          <div>
            <h3 className="font-bold text-green-700 mb-2">Need Help?</h3>
            <p>Téléphone: +213 XXX XXX XXX</p>
            <p>Email: contact@fertival.dz</p>
          </div>
        </div>
      </div>
    </div>
  );
}
