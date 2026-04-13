import { useState } from 'react'

const INITIAL_REQUESTS = [
  { id: 1, name: 'Иван', contact: '+79001112233', service: 'Ремонт витрин', desc: 'Не морозит', status: 'new', date: '2026-04-10' },
  { id: 2, name: 'ООО "Ромашка"', contact: 'info@romashka.ru', service: 'ТО касс', desc: 'Нужна поверка', status: 'in_progress', date: '2026-04-09' },
]

export function useRequests() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS)

  const changeStatus = (id, next) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: next } : r))
  }

  const deleteRequest = (id) => {
    setRequests(prev => prev.filter(r => r.id !== id))
  }

  return { requests, changeStatus, deleteRequest }
}
