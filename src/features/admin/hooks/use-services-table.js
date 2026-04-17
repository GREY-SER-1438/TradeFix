import { useState, useEffect } from 'react'
import { api } from '../../../shared/api/instance'

export function useServicesTable() {
  const [services, setServices] = useState([])
  const [modal, setModal] = useState(null)

  useEffect(() => {
    api.get('/services').then(setServices).catch(() => {})
  }, [])

  const onSaved = (service, isEdit) => {
    setServices(prev =>
      isEdit ? prev.map(s => s.id === service.id ? service : s) : [...prev, service]
    )
    setModal(null)
  }

  const remove = async (id) => {
    await api.delete(`/services/${id}`)
    setServices(prev => prev.filter(s => s.id !== id))
  }

  return { services, modal, setModal, onSaved, remove }
}
