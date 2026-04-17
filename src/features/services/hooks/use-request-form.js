import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { api } from '../../../shared/api/instance'
import { requestSchema } from '../../../shared/lib/schemas'

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
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (location.state?.prefillDesc) {
      setForm(prev => ({ ...prev, desc: location.state.prefillDesc }))
    }
  }, [location.state])

  const submit = async (e) => {
    e.preventDefault()
    const result = requestSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors = {}
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0]] = issue.message
      }
      setErrors(fieldErrors)
      return
    }
    setErrors({})
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
      // silent
    }
  }

  return { form, setForm, errors, success, submit }
}
