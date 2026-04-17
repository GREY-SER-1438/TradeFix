import { useState } from 'react'
import { api } from '../../../shared/api/instance'
import { API_BASE_URL } from '../../../constants'
import { productSchema } from '../../../shared/lib/schemas'

const EMPTY = { name: '', description: '', price: '', category: '' }

export function useProductModal(initial, onSaved) {
  const [form, setForm] = useState(initial ?? EMPTY)
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})

  const isEdit = Boolean(initial)

  const save = async (e) => {
    e.preventDefault()
    const result = productSchema.safeParse(form)
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
      let product
      if (isEdit) {
        product = await api.put(`/products/${initial.id}`, {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          category: form.category,
        })
        if (file) {
          const fd = new FormData()
          fd.append('image', file)
          const token = localStorage.getItem('token')
          const res = await fetch(`${API_BASE_URL}/api/products/${initial.id}/image`, {
            method: 'PUT',
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            body: fd,
          })
          product = await res.json()
        }
      } else {
        product = await api.post('/products', {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          category: form.category,
        })
      }
      onSaved(product, isEdit)
    } finally {
      setSaving(false)
    }
  }

  return { form, setForm, file, setFile, saving, errors, isEdit, save }
}
