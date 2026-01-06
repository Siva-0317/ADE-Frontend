import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  signup: (email: string, password: string) =>
    api.post('/api/auth/signup', { email, password }),
  
  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
  
  logout: () => api.post('/api/auth/logout'),
};

// Automations API
export const automationsAPI = {
  create: (data: any) => api.post('/api/automations/create', data),
  
  list: () => api.get('/api/automations/list'),
  
  get: (id: string) => api.get(`/api/automations/${id}`),
  
  delete: (id: string) => api.delete(`/api/automations/${id}`),
};

// Workflows API
export const workflowsAPI = {
  design: (taskDescription: string, automationType?: string) =>
    api.post('/api/workflows/design', {
      task_description: taskDescription,
      automation_type: automationType,
    }),
};
