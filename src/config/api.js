// API configuration using environment variables
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://crudcrud.com',
  endpoints: {
    unicorns: `/api/${import.meta.env.VITE_API_ID}/unicorns`,
  },
  headers: {
    'Content-Type': 'application/json',
  },
}

export const createApiClient = () => {
  return {
    async get(endpoint) {
      const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
        headers: API_CONFIG.headers,
      })
      if (!response.ok) throw new Error('API Error')
      return response.json()
    },
  }
}
