import { Pencil, Trash2, X } from 'lucide-react'
import { useServicesTable } from './hooks/use-services-table'
import { useServiceModal } from './hooks/use-service-modal'
import './tables.css'

function ServiceModal({ initial, onClose, onSaved }) {
  const { form, setForm, categories, saving, errors, isEdit, save } = useServiceModal(initial, onSaved)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEdit ? 'Редактировать услугу' : 'Добавить услугу'}</h3>
          <button className="btn-icon" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={save}>
          <label>Название</label>
          <input className={errors.name ? 'input-error' : ''} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          {errors.name && <span className="field-error">{errors.name}</span>}

          <label>Описание</label>
          <textarea rows={3} className={errors.description ? 'input-error' : ''} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          {errors.description && <span className="field-error">{errors.description}</span>}

          <label>Категория</label>
          <select className={errors.categoryId ? 'input-error' : ''} value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })}>
            <option value="">Выберите категорию</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          {errors.categoryId && <span className="field-error">{errors.categoryId}</span>}

          <label>Цена, ₽</label>
          <input type="number" min="0" className={errors.price ? 'input-error' : ''} value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          {errors.price && <span className="field-error">{errors.price}</span>}

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
  const { services, modal, setModal, onSaved, remove } = useServicesTable()

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
                <td>{s.category?.name ?? '—'}</td>
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
