const rawBase = import.meta.env.VITE_API_BASE_URL?.trim()

export const API_BASE_URL = rawBase ? rawBase.replace(/\/+$/, '') : ''
export const API_V1 = API_BASE_URL ? `${API_BASE_URL}/api/v1` : '/api/v1'
