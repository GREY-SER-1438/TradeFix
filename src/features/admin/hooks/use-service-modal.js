import { useState } from 'react'
import { api } from '../../../shared/api/instance'
import { serviceSchema } from '../../../shared/lib/schemas'

const EMPTY = { name: '', description: '', category: '', price: '' }

export function useServiceModal(initial, onSaved) {
  const [form, setForm] = useState(initial ?? EMPTY)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})

  const isEdit = Boolean(initial)

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
      const body = { name: form.name, description: form.description, category: form.category, price: Number(form.price) }
      const service = isEdit
        ? await api.put(`/services/${initial.id}`, body)
        : await api.post('/services', body)
      onSaved(service, isEdit)
    } finally {
      setSaving(false)
    }
  }

  return { form, setForm, saving, errors, isEdit, save }
}
