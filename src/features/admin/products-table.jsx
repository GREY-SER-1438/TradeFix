import { Pencil, Trash2 } from 'lucide-react'
import './tables.css'

const mockProducts = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `Товар #${i + 1}`,
  price: 10000 + i * 2000,
  cat: 'Холодильное',
}))

export default function ProductsTable() {
  return (
    <div>
      <div className="table-header">
        <h3>Товары</h3>
        <button className="btn btn-primary">+ Добавить</button>
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
            {mockProducts.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td><img src="https://placehold.co/40x40" alt="" /></td>
                <td>{p.name}</td>
                <td>{p.price.toLocaleString()} ₽</td>
                <td>{p.cat}</td>
                <td>
                  <div className="actions">
                    <button className="btn btn-outline icon-btn"><Pencil size={15} /></button>
                    <button className="btn btn-danger icon-btn"><Trash2 size={15} /></button>
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
