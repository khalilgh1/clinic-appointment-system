import ServiceTemplate from "@/components/layout/serviceTemplate";
import { createClient } from "@/lib/supabase/server";



export default async function Page({ params }) {
  // ⬅️ FIX: params is a Promise
  const resolved = await params;
  const numericId = Number(resolved.id);

  if (isNaN(numericId)) {
    return <div className="p-6 text-red-500">Invalid service ID</div>;
  }

  const supabase = await createClient();

  const { data: service, error } = await supabase
    .from("service")
    .select("*")
    .eq("service_id", numericId)
    .single();

  if (error || !service) {
    console.error("Supabase fetch error:", error);
    return <div className="p-6 text-red-500">Service not found</div>;
  }

  // Parse JSON string → array
  const jsonFields = ["exams", "equipments", "advantages", "procedures"];
  for (const key of jsonFields) {
    if (service[key]) {
      try {
        service[key] = JSON.parse(service[key]);
      } catch (err) {
        console.error("JSON parse error on", key, err);
      }
    }
  }

  return <ServiceTemplate service={service} />;
}
