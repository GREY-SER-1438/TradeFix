import { useState } from 'react'

const PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Торговое оборудование #${i + 1}`,
  price: 8000 + i * 2500,
  cat: i % 3 === 0 ? 'Холодильное' : i % 3 === 1 ? 'Мебель' : 'Кассовое',
  img: 'https://placehold.co/300x200/e2e8f0/64748b?text=Product',
}))

function toPositive(value) {
  const num = parseFloat(value)
  if (isNaN(num) || num < 0) return ''
  return String(num)
}

export function useCatalogFilters() {
  const [filters, setFilters] = useState({ cat: '', min: '', max: '' })

  const updateFilters = (patch) => {
    const next = { ...filters, ...patch }
    if ('min' in patch) next.min = toPositive(patch.min)
    if ('max' in patch) next.max = toPositive(patch.max)
    setFilters(next)
  }

  const filtered = PRODUCTS.filter(p => {
    if (filters.cat && p.cat !== filters.cat) return false
    if (filters.min && p.price < +filters.min) return false
    if (filters.max && p.price > +filters.max) return false
    return true
  })

  return { filters, setFilters: updateFilters, filtered }
}
