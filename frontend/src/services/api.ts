import axios from 'axios';
import { supabase } from './supabase';

// 1. Create the Axios instance pointing to your Backend
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Reads from .env
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor: Auto-inject the JWT Token
apiClient.interceptors.request.use(
  async (config) => {
    // Ask Supabase for the current session
    const { data } = await supabase.auth.getSession();
    
    // If a token exists, attach it to the Authorization header
    if (data.session?.access_token) {
      config.headers.Authorization = `Bearer ${data.session.access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor: Logging out & clearing memory state for invalid token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Check if it's a 401 error from the backend
    if (error.response && error.response.status === 401) {
      console.warn('Session expired or invalid. Logging out...');
      
      // 1. Clear Supabase LocalStorage
      await supabase.auth.signOut();
      
      // 2. Force redirect to login
      // We use window.location to ensure a hard refresh clears any stale memory state
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;