import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const SERVICES_LIST = [
  { id: 1, name: 'Ремонт холодильных витрин', cat: 'Ремонт', price: 4500, desc: 'Замена ТЭНов, фреона, термостатов.' },
  { id: 2, name: 'ТО весового оборудования', cat: 'ТО', price: 2000, desc: 'Поверка, калибровка, чистка датчиков.' },
  { id: 3, name: 'Продажа кассовых боксов', cat: 'Покупка', price: 32000, desc: 'Новые и восстановленные модели.' },
]

const emptyForm = { name: '', contact: '', serviceId: '', desc: '' }

export function useRequestForm() {
  const location = useLocation()
  const [form, setForm] = useState(emptyForm)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (location.state?.prefillDesc) {
      setForm(prev => ({ ...prev, desc: location.state.prefillDesc }))
    }
  }, [location.state])

  const submit = (e) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
    setForm(emptyForm)
  }

  return { form, setForm, success, submit }
}
