import { useEffect, useState } from 'react'
import { Pencil, Trash2, X } from 'lucide-react'
import { api } from '../../shared/api/instance'
import './tables.css'

const EMPTY = { name: '', description: '', category: '', price: '' }

function ServiceModal({ initial, onClose, onSaved }) {
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEdit ? 'Редактировать услугу' : 'Добавить услугу'}</h3>
          <button className="btn-icon" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={save}>
          <label>Название</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <label>Описание</label>
          <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
          <label>Категория</label>
          <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
          <label>Цена, ₽</label>
          <input type="number" min="0" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Отмена</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ServicesTable() {
  const [services, setServices] = useState([])
  const [modal, setModal] = useState(null)

  useEffect(() => {
    api.get('/services').then(setServices).catch(() => {})
  }, [])

  const onSaved = (service, isEdit) => {
    setServices(prev =>
      isEdit ? prev.map(s => s.id === service.id ? service : s) : [...prev, service]
    )
    setModal(null)
  }

  const remove = async (id) => {
    await api.delete(`/services/${id}`)
    setServices(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div>
      {modal !== null && (
        <ServiceModal
          initial={modal === 'create' ? null : modal}
          onClose={() => setModal(null)}
          onSaved={onSaved}
        />
      )}
      <div className="table-header">
        <h3>Услуги</h3>
        <button className="btn btn-primary" onClick={() => setModal('create')}>+ Добавить</button>
      </div>
      <div className="table-wrap">
        <table className="admin-table">
          <colgroup>
            <col className="col-id" />
            <col className="col-name" />
            <col className="col-cat" />
            <col className="col-price" />
            <col className="col-actions" />
          </colgroup>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Категория</th>
              <th>Цена</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {services.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.category}</td>
                <td>{Number(s.price).toLocaleString()} ₽</td>
                <td>
                  <div className="actions">
                    <button className="btn btn-outline icon-btn" onClick={() => setModal(s)}><Pencil size={15} /></button>
                    <button className="btn btn-danger icon-btn" onClick={() => remove(s.id)}><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
