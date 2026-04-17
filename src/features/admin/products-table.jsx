import { Pencil, Trash2, X } from 'lucide-react'
import { useProducts } from './hooks/use-products'
import { useProductModal } from './hooks/use-product-modal'
import './tables.css'

function ProductModal({ initial, onClose, onSaved }) {
  const { form, setForm, setFile, saving, isEdit, save } = useProductModal(initial, onSaved)

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
  const { products, modal, setModal, onSaved, remove } = useProducts()

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
