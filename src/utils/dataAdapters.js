// utils/dataAdapters.js
export const adaptServiceFromAPI = (apiData) => ({
  id: apiData.id,
  name: apiData.name,
  description: apiData.description,
  price: apiData.price,
  badge: apiData.badge || null,
  icon: mapIconName(apiData.icon_name),
  // other possible fields can be added here
});

export const adaptDoctorFromAPI = (apiData) => ({
  id: apiData.id,
  name: apiData.title ? `${apiData.title} ${apiData.first_name} ${apiData.last_name}` : apiData.name,
  specialty: apiData.specialty || apiData.specialization,
  description: apiData.bio || apiData.expertise,
  email: apiData.email || apiData.contact_email,
  imageUrl: apiData.profile_picture || apiData.avatar_url,
  phone: apiData.phone,
  languages: apiData.languages || [],
  experience: apiData.years_experience,
  // fields for availability can be added as needed
  availability: apiData.availability_slots,
});

const mapIconName = (backendIconName) => {
  const iconMap = {
    'fertility': 'heart',
    'couple_therapy': 'users',
    'endocrinology': 'activity',
    'urology': 'activity',
    'laboratory': 'microscope',
    'teleconsultation': 'phone',
  };
  return iconMap[backendIconName] || 'heart';
};