import { useState, useEffect } from 'react'
import { api } from '../../../shared/api/instance'

export function useCategories() {
  const [categories, setCategories] = useState([])
  const [activeType, setActiveType] = useState('product')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ name: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api.get('/categories').then(setCategories).catch(() => {})
  }, [])

  const openCreate = () => {
    setForm({ name: '' })
    setModal('create')
  }

  const save = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    setSaving(true)
    try {
      const cat = await api.post('/categories', { name: form.name.trim(), type: activeType })
      setCategories(prev => [...prev, cat])
      setModal(null)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    await api.delete(`/categories/${id}`)
    setCategories(prev => prev.filter(c => c.id !== id))
  }

  const visible = categories.filter(c => c.type === activeType)

  return { visible, activeType, setActiveType, modal, setModal, openCreate, form, setForm, saving, save, remove }
}
