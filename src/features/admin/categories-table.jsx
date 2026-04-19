import { Trash2, X } from 'lucide-react'
import { useCategories } from './hooks/use-categories'
import './tables.css'

function CategoryModal({ form, setForm, saving, save, onClose, type }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Добавить категорию — {type === 'product' ? 'Товар' : 'Услуга'}</h3>
          <button className="btn-icon" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={save}>
          <label>Название</label>
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            autoFocus
          />
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

export default function CategoriesTable() {
  const { visible, activeType, setActiveType, modal, setModal, openCreate, form, setForm, saving, save, remove } = useCategories()

  return (
    <div>
      {modal === 'create' && (
        <CategoryModal
          form={form}
          setForm={setForm}
          saving={saving}
          save={save}
          type={activeType}
          onClose={() => setModal(null)}
        />
      )}
      <div className="table-header">
        <h3>Категории</h3>
        <button className="btn btn-primary" onClick={openCreate}>+ Добавить</button>
      </div>

      <div className="type-tabs">
        <button
          className={`type-tab ${activeType === 'product' ? 'active' : ''}`}
          onClick={() => setActiveType('product')}
        >
          Товары
        </button>
        <button
          className={`type-tab ${activeType === 'service' ? 'active' : ''}`}
          onClick={() => setActiveType('service')}
        >
          Услуги
        </button>
      </div>

      <div className="table-wrap">
        <table className="admin-table">
          <colgroup>
            <col className="col-id" />
            <col className="col-fill" />
            <col className="col-actions" />
          </colgroup>
          <thead>
            <tr>
              <th>№</th>
              <th>Название</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((c, idx) => (
              <tr key={c.id}>
                <td>{idx + 1}</td>
                <td>{c.name}</td>
                <td>
                  <div className="actions">
                    <button className="btn btn-danger icon-btn" onClick={() => remove(c.id)}><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr><td colSpan={3} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1.5rem' }}>Нет категорий</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
