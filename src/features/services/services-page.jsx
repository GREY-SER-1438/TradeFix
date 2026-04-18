import { useRequestForm, useServices } from './hooks/use-request-form.js'
import { useServicesFilters } from './hooks/use-services-filters.js'
import './services-page.css'

export default function ServicesPage() {
  const { form, setForm, errors, success, submit } = useRequestForm()
  const formServices = useServices()
  const { filters, setFilters, services, categories } = useServicesFilters()

  const reset = () => setFilters({ categoryId: '', min: '', max: '' })
  const hasFilters = filters.categoryId || filters.min || filters.max

  return (
    <div className="services-page">
      <div className="form-box card">
        <h2>Заявка</h2>
        {success && <div className="msg success">Заявка успешно отправлена!</div>}
        <form onSubmit={submit} className="request-form">
          <input
            placeholder="Имя"
            className={errors.name ? 'input-error' : ''}
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}

          <input
            placeholder="Телефон / Email"
            className={errors.contact ? 'input-error' : ''}
            value={form.contact}
            onChange={e => setForm({ ...form, contact: e.target.value })}
          />
          {errors.contact && <span className="field-error">{errors.contact}</span>}

          <select
            className={errors.serviceId ? 'input-error' : ''}
            value={form.serviceId}
            onChange={e => setForm({ ...form, serviceId: e.target.value })}
          >
            <option value="">Выберите услугу</option>
            {formServices.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          {errors.serviceId && <span className="field-error">{errors.serviceId}</span>}

          <textarea
            placeholder="Описание проблемы"
            rows="3"
            className={errors.desc ? 'input-error' : ''}
            value={form.desc}
            onChange={e => setForm({ ...form, desc: e.target.value })}
          />
          {errors.desc && <span className="field-error">{errors.desc}</span>}

          <button type="submit" className="btn btn-primary">Отправить заявку</button>
        </form>
      </div>

      <div className="catalog-layout" style={{ marginTop: '2rem' }}>
        <aside className="catalog-sidebar">
          <div className="sidebar-header">
            <h2>Фильтры</h2>
            {hasFilters && (
              <button className="reset-btn" onClick={reset}>Сбросить</button>
            )}
          </div>

          <div className="filter-group">
            <label className="filter-label">Категория</label>
            <select value={filters.categoryId} onChange={e => setFilters({ categoryId: e.target.value })}>
              <option value="">Все категории</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Цена, ₽</label>
            <div className="price-range">
              <input
                type="number"
                placeholder="от"
                min="0"
                value={filters.min}
                onChange={e => setFilters({ min: e.target.value })}
                onKeyDown={e => e.key === '-' && e.preventDefault()}
              />
              <input
                type="number"
                placeholder="до"
                min="0"
                value={filters.max}
                onChange={e => setFilters({ max: e.target.value })}
                onKeyDown={e => e.key === '-' && e.preventDefault()}
              />
            </div>
          </div>
        </aside>

        <div className="catalog-main">
          <div className="catalog-header">
            <h1>Услуги</h1>
            <span className="catalog-count">{services.length} услуг</span>
          </div>

          <div className="products-grid">
            {services.map(s => (
              <div key={s.id} className="product-card">
                <div className="product-card__body">
                  <div className="product-card__cat">{s.category?.name ?? ''}</div>
                  <h3>{s.name}</h3>
                  <p className="service-card__desc">{s.description}</p>
                  <p className="price">от {Number(s.price).toLocaleString()} ₽</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
