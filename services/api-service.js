export const API_BASE_URL =
  process.env.API_BASE_URL ?? 'https://api-testing-postman.vercel.app/api/v1';

export class ApiService {
  constructor(request) {
    this.request = request;
  }

  get(path, options = {}) {
    return this.request.get(`${API_BASE_URL}${path}`, options);
    
  }

  post(path, data, options = {}) {
    return this.request.post(`${API_BASE_URL}${path}`, { ...options, data });
    
  }

  put(path, data, options = {}) {
    return this.request.put(`${API_BASE_URL}${path}`, { ...options, data });
  }

  delete(path, options = {}) {
    return this.request.delete(`${API_BASE_URL}${path}`, options);
  }
}
