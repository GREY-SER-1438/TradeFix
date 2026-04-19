import { useParams, Link } from 'react-router-dom'
import { useProduct } from './hooks/use-product'
import './product-detail-page.css'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { product, loading } = useProduct(id)

  if (loading) return <div className="detail"><p>Загрузка...</p></div>
  if (!product) return <div className="detail"><p>Товар не найден. <Link to="/catalog">← Назад</Link></p></div>

  return (
    <div className="detail">
      <p className="detail-breadcrumb">
        <Link to="/catalog">← Каталог</Link>
      </p>
      <div className="card detail-wrap">
        <img
          src={product.image ? `http://localhost:3001${product.image}` : 'https://placehold.co/600x400/e2e8f0/64748b?text=Detail'}
          alt={product.name}
        />
        <div className="detail-info">
          <span className="badge">{product.category?.name ?? ''}</span>
          <h1>{product.name}</h1>
          <span className="price">{Number(product.price).toLocaleString()} ₽</span>
          <hr className="detail-divider" />
          <p className="desc">{product.description}</p>
          <div className="detail-actions">
            <Link to="/catalog" className="btn btn-outline">Назад</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
