import { useEffect, useState } from 'react'
import { Pencil, Trash2, X } from 'lucide-react'
import { api } from '../../shared/api/instance'
import { API_BASE_URL } from '../../constants'
import './tables.css'

const EMPTY = { name: '', description: '', price: '', category: '' }

function ProductModal({ initial, onClose, onSaved }) {
  const [form, setForm] = useState(initial ?? EMPTY)
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)

  const isEdit = Boolean(initial)

  const save = async (e) => {
    e.preventDefault()
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEdit ? 'Редактировать товар' : 'Добавить товар'}</h3>
          <button className="btn-icon" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={save}>
          <label>Название</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <label>Описание</label>
          <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
          <label>Цена, ₽</label>
          <input type="number" min="0" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
          <label>Категория</label>
          <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
          {isEdit && (
            <>
              <label>Фото</label>
              <input type="file" accept="image/*" style={{ marginBottom: '1rem' }}
                onChange={e => setFile(e.target.files[0] ?? null)} />
            </>
          )}
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

export default function ProductsTable() {
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

  return (
    <div>
      {modal !== null && (
        <ProductModal
          initial={modal === 'create' ? null : modal}
          onClose={() => setModal(null)}
          onSaved={onSaved}
        />
      )}
      <div className="table-header">
        <h3>Товары</h3>
        <button className="btn btn-primary" onClick={() => setModal('create')}>+ Добавить</button>
      </div>
      <div className="table-wrap">
        <table className="admin-table">
          <colgroup>
            <col className="col-id" />
            <col className="col-img" />
            <col className="col-name" />
            <col className="col-price" />
            <col className="col-cat" />
            <col className="col-actions" />
          </colgroup>
          <thead>
            <tr>
              <th>ID</th>
              <th>Фото</th>
              <th>Название</th>
              <th>Цена</th>
              <th>Категория</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  <img
                    src={p.image ? `http://localhost:3001${p.image}` : 'https://placehold.co/40x40'}
                    alt=""
                  />
                </td>
                <td>{p.name}</td>
                <td>{p.price != null ? Number(p.price).toLocaleString() + ' ₽' : '—'}</td>
                <td>{p.category ?? '—'}</td>
                <td>
                  <div className="actions">
                    <button className="btn btn-outline icon-btn" onClick={() => setModal(p)}><Pencil size={15} /></button>
                    <button className="btn btn-danger icon-btn" onClick={() => remove(p.id)}><Trash2 size={15} /></button>
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
