import { Link } from 'react-router-dom'
import { useCatalogFilters } from './hooks/use-catalog-filters.js'
import './catalog-page.css'

export default function CatalogPage() {
  const { filters, setFilters, filtered } = useCatalogFilters()

  const reset = () => setFilters({ cat: '', min: '', max: '' })
  const hasFilters = filters.cat || filters.min || filters.max

  return (
    <div className="catalog-layout">
      <aside className="catalog-sidebar">
        <div className="sidebar-header">
          <h2>Фильтры</h2>
          {hasFilters && (
            <button className="reset-btn" onClick={reset}>Сбросить</button>
          )}
        </div>

        <div className="filter-group">
          <label className="filter-label">Категория</label>
          <select value={filters.cat} onChange={e => setFilters({ cat: e.target.value })}>
            <option value="">Все категории</option>
            <option>Холодильное</option>
            <option>Мебель</option>
            <option>Кассовое</option>
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
          <h1>Каталог</h1>
          <span className="catalog-count">{filtered.length} товаров</span>
        </div>

        <div className="products-grid">
          {filtered.map(p => (
            <div key={p.id} className="product-card">
              <img
                className="product-card__img"
                src={p.image ? `http://localhost:3001${p.image}` : 'https://placehold.co/300x200/e2e8f0/64748b?text=Product'}
                alt={p.name}
              />
              <div className="product-card__body">
                <div className="product-card__cat">{p.category}</div>
                <h3>{p.name}</h3>
                <p className="price">{Number(p.price).toLocaleString()} ₽</p>
                <Link to={`/catalog/${p.id}`} className="btn btn-outline">Подробнее</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
