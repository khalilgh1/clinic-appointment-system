import ServiceTemplate from "@/components/layout/serviceTemplate";

const services = [
  {
    service_id: 1,
    name: "General Consultation",
    description: "Comprehensive medical exam",
    equipments: ["Stethoscope", "Blood Pressure Monitor"],
    exams: ["Vital Signs Check"],
    procedures: ["Patient interview", "Physical exam"],
    advantages: ["Quick diagnosis", "Personalized treatment"],
    price: 5000,
    duration_min: 30,
  },
  {
    service_id: 2,
    name: "Blood Test",
    description: "Basic blood analysis",
    equipments: ["Needle", "Test Tubes"],
    exams: ["Blood Draw"],
    procedures: ["Draw blood", "Lab analysis"],
    advantages: ["Fast results"],
    price: 2000,
    duration_min: 15,
  },
];

export default async function Page({ params }) {
  const resolvedParams = await params; 
  const id = Number(resolvedParams.id);

  if (isNaN(id)) return <div className="p-6 text-red-500">Invalid service ID</div>;

  const service = services.find((s) => s.service_id === id);

  if (!service) return <div className="p-6 text-red-500">Service not found</div>;

  return <ServiceTemplate service={service} />;
}
