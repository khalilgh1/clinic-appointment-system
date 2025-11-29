"use client";
import React from "react";
import TitleBlock from "./TitleBlock";
import FAQCard from "./FAQCard";

export default function QuestionsSection() {
  const faqList = [
    {
      q: "Quand consulter un spécialiste en fertilité ?",
      a: "Après 12 mois de rapports non protégés sans grossesse, ou plus tôt après 6 mois si la femme a plus de 35 ans.",
    },
    {
      q: "Quelle est la différence entre FIV et insémination ?",
      a: "L’insémination place les spermatozoïdes directement dans l’utérus, tandis que la FIV consiste à féconder l’ovocyte en laboratoire avant transfert.",
    },
    {
      q: "La PMA est-elle douloureuse ?",
      a: "Non, les procédures sont réalisées sous anesthésie légère ou locale. Le confort de la patiente est une priorité.",
    },
    {
      q: "Peut-on faire une téléconsultation pour un premier avis ?",
      a: "Oui, nos médecins proposent des téléconsultations pour le premier contact ou le suivi.",
    },
    {
      q: "Quelle est la durée d’un traitement ?",
      a: "Selon la méthode choisie, le parcours dure de quelques semaines à quelques mois.",
    },
  ];

  return (
    <section style={{ padding: "4rem 2rem" }}>
      {/* Title Block */}
      <TitleBlock
        titleStart="Avez-vous"
        titleEnd="questions ?"
        description="Trouvez des réponses aux questions les plus fréquentes concernant nos services, nos rendez-vous et notre accompagnement médical."
      />

      {/* FAQ Cards */}
      <div style={{ marginTop: "2.5rem" }}>
        {faqList.map((item, index) => (
          <FAQCard key={index} question={item.q} answer={item.a} />
        ))}
      </div>
    </section>
  );
}
