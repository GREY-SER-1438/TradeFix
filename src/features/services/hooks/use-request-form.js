import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { api } from '../../../shared/api/instance'

const emptyForm = { name: '', contact: '', serviceId: '', desc: '' }

export function useServices() {
  const [services, setServices] = useState([])

  useEffect(() => {
    api.get('/services').then(setServices).catch(() => {})
  }, [])

  return services
}

export function useRequestForm() {
  const location = useLocation()
  const [form, setForm] = useState(emptyForm)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (location.state?.prefillDesc) {
      setForm(prev => ({ ...prev, desc: location.state.prefillDesc }))
    }
  }, [location.state])

  const submit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/requests', {
        clientName: form.name,
        clientContact: form.contact,
        serviceId: Number(form.serviceId),
        description: form.desc,
      })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      setForm(emptyForm)
    } catch {
      // silent — could add error state here
    }
  }

  return { form, setForm, success, submit }
}
