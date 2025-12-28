import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function ServicesPage() {
  const supabase = await createClient();

  const { data: services = [], error } = await supabase
    .from("service")
    .select("*");

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">All Services</h2>
        <p className="text-red-600">Failed to load services.</p>
      </div>
    );
  }

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
