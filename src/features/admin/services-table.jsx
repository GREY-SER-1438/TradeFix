import { Pencil, Trash2 } from 'lucide-react'
import './tables.css'

const mockServices = Array.from({ length: 3 }, (_, i) => ({
  id: i + 1,
  name: `Услуга #${i + 1}`,
  cat: i % 2 ? 'Ремонт' : 'ТО',
  price: 2000 + i * 1000,
}))

export default function ServicesTable() {
  return (
    <div>
      <div className="table-header">
        <h3>Услуги</h3>
        <button className="btn btn-primary">+ Добавить</button>
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
            {mockServices.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.cat}</td>
                <td>{s.price.toLocaleString()} ₽</td>
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
