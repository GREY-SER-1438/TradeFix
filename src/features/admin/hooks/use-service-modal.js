import { useState, useEffect } from 'react'
import { api } from '../../../shared/api/instance'
import { serviceSchema } from '../../../shared/lib/schemas'

const EMPTY = { name: '', description: '', categoryId: '', price: '' }

function toInitial(s) {
  if (!s) return EMPTY
  return { name: s.name, description: s.description, categoryId: s.category?.id ?? '', price: s.price }
}

export function useServiceModal(initial, onSaved) {
  const [form, setForm] = useState(() => toInitial(initial))
  const [categories, setCategories] = useState([])
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})

  const isEdit = Boolean(initial)

  useEffect(() => {
    api.get('/categories', { type: 'service' }).then(setCategories).catch(() => {})
  }, [])

  const save = async (e) => {
    e.preventDefault()
    const result = serviceSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors = {}
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0]] = issue.message
      }
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    setSaving(true)
    try {
      const body = {
        name: form.name,
        description: form.description,
        categoryId: Number(form.categoryId),
        price: Number(form.price),
      }
      const service = isEdit
        ? await api.put(`/services/${initial.id}`, body)
        : await api.post('/services', body)
      onSaved(service, isEdit)
    } finally {
      setSaving(false)
    }
  }

  return { form, setForm, categories, saving, errors, isEdit, save }
}
