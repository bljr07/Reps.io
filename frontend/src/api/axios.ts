import axios from 'axios';
import { supabase } from '../services/supabase';

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

// 3. Response Interceptor: Optional Global Error Handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the backend returns 401 (Unauthorized), we might want to log the user out
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized! Redirecting to login...');
      // In the future, we can force a redirect here
    }
    return Promise.reject(error);
  }
);

export default apiClient;