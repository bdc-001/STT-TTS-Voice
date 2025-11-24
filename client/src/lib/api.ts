import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the API key or JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (apiKey) {
      config.headers['X-API-Key'] = apiKey;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      // window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export const auth = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getProfile: () => api.get('/profile'),
  updateProfile: (data: any) => api.put('/profile', data),
};

export const stt = {
  transcribe: (formData: FormData) => api.post('/stt/transcribe', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getLanguages: () => api.get('/stt/languages'),
  getFormats: () => api.get('/stt/formats'),
};

export const tts = {
  generate: (data: any) => api.post('/tts/generate-json', data),
  getVoices: () => api.get('/tts/voices'),
  getVoice: (id: string) => api.get(`/tts/voices/${id}`),
  getLanguages: () => api.get('/tts/languages'),
  getFormats: () => api.get('/tts/formats'),
};

export const user = {
  getApiKeys: () => api.get('/api-keys'),
  createApiKey: (data: any) => api.post('/api-keys', data),
  deleteApiKey: (id: number) => api.delete(`/api-keys/${id}`),
  getUsage: () => api.get('/usage'),
};

export const jobs = {
  get: (id: string) => api.get(`/jobs/${id}`),
  list: () => api.get('/jobs'),
};

export const voices = {
  clone: (formData: FormData) => api.post('/tts/clone', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  design: (data: any) => api.post('/tts/design', data),
};
