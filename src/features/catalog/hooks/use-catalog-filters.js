import { useState, useEffect } from 'react'
import { api } from '../../../shared/api/instance'

function toPositive(value) {
  const num = parseFloat(value)
  if (isNaN(num) || num < 0) return ''
  return String(num)
}

export function useCatalogFilters() {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({ cat: '', min: '', max: '' })

  useEffect(() => {
    api.get('/products').then(setProducts).catch(() => {})
  }, [])

  const updateFilters = (patch) => {
    const next = { ...filters, ...patch }
    if ('min' in patch) next.min = toPositive(patch.min)
    if ('max' in patch) next.max = toPositive(patch.max)
    setFilters(next)
  }

  const filtered = products.filter(p => {
    if (filters.cat && p.category !== filters.cat) return false
    if (filters.min && p.price < +filters.min) return false
    if (filters.max && p.price > +filters.max) return false
    return true
  })

  return { filters, setFilters: updateFilters, filtered }
}
