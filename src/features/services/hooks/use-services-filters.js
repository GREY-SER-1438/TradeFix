import { useState, useEffect } from 'react'
import { api } from '../../../shared/api/instance'

function toPositive(value) {
  const num = parseFloat(value)
  if (isNaN(num) || num < 0) return ''
  return String(num)
}

export function useServicesFilters() {
  const [services, setServices] = useState([])
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({ categoryId: '', min: '', max: '' })

  useEffect(() => {
    api.get('/categories', { type: 'service' }).then(setCategories).catch(() => {})
  }, [])

  useEffect(() => {
    const params = {}
    if (filters.categoryId) params.categoryId = filters.categoryId
    if (filters.min) params.minPrice = filters.min
    if (filters.max) params.maxPrice = filters.max
    api.get('/services', Object.keys(params).length ? params : undefined)
      .then(setServices)
      .catch(() => {})
  }, [filters])

  const updateFilters = (patch) => {
    const next = { ...filters, ...patch }
    if ('min' in patch) next.min = toPositive(patch.min)
    if ('max' in patch) next.max = toPositive(patch.max)
    setFilters(next)
  }

  return { filters, setFilters: updateFilters, services, categories }
}
