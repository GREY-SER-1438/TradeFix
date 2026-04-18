import { useState, useEffect } from 'react'
import { api } from '../../../shared/api/instance'
import { API_V1 } from '../../../constants'
import { productSchema } from '../../../shared/lib/schemas'

const EMPTY = { name: '', description: '', price: '', categoryId: '' }

function toInitial(p) {
  if (!p) return EMPTY
  return { name: p.name, description: p.description, price: p.price, categoryId: p.category?.id ?? '' }
}

export function useProductModal(initial, onSaved) {
  const [form, setForm] = useState(() => toInitial(initial))
  const [categories, setCategories] = useState([])
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})

  const isEdit = Boolean(initial)

  useEffect(() => {
    api.get('/categories', { type: 'product' }).then(setCategories).catch(() => {})
  }, [])

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
      if (file) {
        const fd = new FormData()
        fd.append('name', form.name)
        fd.append('description', form.description)
        fd.append('price', String(Number(form.price)))
        fd.append('categoryId', String(form.categoryId))
        fd.append('image', file)
        const token = localStorage.getItem('token')
        const method = isEdit ? 'PUT' : 'POST'
        const url = isEdit ? `${API_V1}/products/${initial.id}` : `${API_V1}/products`
        const res = await fetch(url, {
          method,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: fd,
        })
        product = await res.json()
      } else {
        const body = {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          categoryId: Number(form.categoryId),
        }
        product = isEdit
          ? await api.put(`/products/${initial.id}`, body)
          : await api.post('/products', body)
      }
      onSaved(product, isEdit)
    } finally {
      setSaving(false)
    }
  }

  return { form, setForm, categories, file, setFile, saving, errors, isEdit, save }
}
