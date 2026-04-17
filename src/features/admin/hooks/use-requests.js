import { useState, useEffect } from 'react'
import { api } from '../../../shared/api/instance'

export function useRequests() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    api.get('/requests').then(setRequests).catch(() => {})
  }, [])

  const changeStatus = async (id, status) => {
    await api.put(`/requests/${id}`, { status })
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r))
  }

  const deleteRequest = async (id) => {
    await api.delete(`/requests/${id}`)
    setRequests(prev => prev.filter(r => r.id !== id))
  }

  return { requests, changeStatus, deleteRequest }
}
