// services/apiService.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async fetchWithAuth(endpoint, options = {}) {
    const token = localStorage.getItem('authToken');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  // Services
  async getServices() {
    return this.fetchWithAuth('/api/services');
  }

  async getDoctors(serviceId = null) {
    const endpoint = serviceId 
      ? `/api/doctors?serviceId=${serviceId}`
      : '/api/doctors';
    return this.fetchWithAuth(endpoint);
  }

  async getDoctorProfile(doctorId) {
    return this.fetchWithAuth(`/api/doctors/${doctorId}`);
  }

  async createAppointment(data) {
    return this.fetchWithAuth('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiService = new ApiService();