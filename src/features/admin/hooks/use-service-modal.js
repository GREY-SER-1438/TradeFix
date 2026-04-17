import { useState } from 'react'
import { api } from '../../../shared/api/instance'

const EMPTY = { name: '', description: '', category: '', price: '' }

export function useServiceModal(initial, onSaved) {
  const [form, setForm] = useState(initial ?? EMPTY)
  const [saving, setSaving] = useState(false)

  const isEdit = Boolean(initial)

  const save = async (e) => {
    e.preventDefault()
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

  return { form, setForm, saving, isEdit, save }
}
