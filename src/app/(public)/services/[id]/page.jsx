import ServiceTemplate from "@/components/ui/serviceTemplate";
import { createClient } from "@/lib/supabase/server";

export default async function Page({ params }) {
  // Await params
  const resolvedParams = await params;
  const serviceId = Number(resolvedParams.id);

  // Validate ID
  if (isNaN(serviceId)) {
    return (
      <div className="min-h-screen bg-[#F4F7F9] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">ID Invalide</h1>
          <p className="text-gray-600 mb-6">L'identifiant du service n'est pas valide.</p>
          <a 
            href="/services" 
            className="inline-block bg-[#0f3c46] text-white px-6 py-3 rounded-lg hover:bg-[#256c7a] transition-colors"
          >
            Retour aux services
          </a>
        </div>
      </div>
    );
  }

  // Fetch service from Supabase
  const supabase = await createClient();

  const { data: service, error } = await supabase
    .from("service")
    .select("*")
    .eq("service_id", serviceId)
    .single();

  // Handle errors
  if (error || !service) {
    return (
      <div className="min-h-screen bg-[#F4F7F9] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Service Introuvable</h1>
          <p className="text-gray-600 mb-6">
            Le service demandé n'existe pas ou n'est plus disponible.
          </p>
          <a 
            href="/services" 
            className="inline-block bg-[#0f3c46] text-white px-6 py-3 rounded-lg hover:bg-[#256c7a] transition-colors"
          >
            Voir tous les services
          </a>
        </div>
      </div>
    );
  }

  // Supabase JSONB columns are automatically parsed - no manual parsing needed
  // This prevents JSON parse errors completely
  
  return <ServiceTemplate service={service} />;
}