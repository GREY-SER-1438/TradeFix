import { useParams, useNavigate, Link } from 'react-router-dom'
import './product-detail-page.css'

function getProductById(id) {
  return {
    id: +id,
    name: `Торговое оборудование #${id}`,
    price: 25000,
    cat: 'Холодильное',
    desc: 'Профессиональная витрина с динамическим охлаждением. Энергокласс A+. Размеры: 1200×800×1300 мм. Гарантия 24 мес. Доставка по РФ.',
    img: 'https://placehold.co/600x400/e2e8f0/64748b?text=Detail',
  }
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)

  const requestService = () => {
    navigate('/services', { state: { prefillDesc: `Интересует товар: ${product.name} (${product.cat})` } })
  }

  return (
    <div className="detail">
      <p className="detail-breadcrumb">
        <Link to="/catalog">← Каталог</Link>
      </p>
      <div className="card detail-wrap">
        <img src={product.img} alt={product.name} />
        <div className="detail-info">
          <span className="badge">{product.cat}</span>
          <h1>{product.name}</h1>
          <span className="price">{product.price.toLocaleString()} ₽</span>
          <hr className="detail-divider" />
          <p className="desc">{product.desc}</p>
          <div className="detail-actions">
            <button onClick={requestService} className="btn btn-primary">Оставить заявку</button>
            <Link to="/catalog" className="btn btn-outline">Назад</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
