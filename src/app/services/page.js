import Link from "next/link";
import { createClient } from "@/lib/supabase/server";


// Dummy data for localhost
/*const services = [
  { service_id: 1, name: "General Consultation" },
  { service_id: 2, name: "Blood Test" },
  { service_id: 3, name: "X-Ray" },
];*/

const supabase = await createClient();

const { data: services, error } = await supabase
    .from("service")
    .select("*")



export default function ServicesPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Services</h2>
      <ul className="space-y-2">
        {services.map((s) => (
          <li key={s.service_id}>
            <Link
              href={`/services/${s.service_id}`}
              className="text-blue-600 hover:underline"
            >
              {s.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
