import { useState, useEffect } from 'react'
import { api } from '../../../shared/api/instance'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [modal, setModal] = useState(null)

  useEffect(() => {
    api.get('/products').then(setProducts).catch(() => {})
  }, [])

  const onSaved = (product, isEdit) => {
    setProducts(prev =>
      isEdit ? prev.map(p => p.id === product.id ? product : p) : [...prev, product]
    )
    setModal(null)
  }

  const remove = async (id) => {
    await api.delete(`/products/${id}`)
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  return { products, modal, setModal, onSaved, remove }
}
