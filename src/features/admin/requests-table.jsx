import { Trash2 } from 'lucide-react'
import { useRequests } from './hooks/use-requests.js'
import './tables.css'

export default function RequestsTable() {
  const { requests, changeStatus, deleteRequest } = useRequests()

  return (
    <div>
      <div className="table-header">
        <h3>Заявки</h3>
      </div>
      <div className="table-wrap">
        <table className="admin-table">
          <colgroup>
            <col className="col-id" />
            <col />
            <col className="col-contact" />
            <col />
            <col className="col-status" />
            <col className="col-date" />
            <col className="col-actions" />
          </colgroup>
          <thead>
            <tr>
              <th>ID</th>
              <th>Клиент</th>
              <th>Контакт</th>
              <th>Услуга</th>
              <th>Статус</th>
              <th>Дата</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>{r.contact}</td>
                <td>{r.service}</td>
                <td>
                  <select value={r.status} onChange={e => changeStatus(r.id, e.target.value)}>
                    <option value="new">Новая</option>
                    <option value="in_progress">В работе</option>
                    <option value="completed">Готова</option>
                  </select>
                </td>
                <td>{r.date}</td>
                <td>
                  <div className="actions">
                    <button className="btn btn-danger icon-btn" onClick={() => deleteRequest(r.id)}>
                      <Trash2 size={15} />
                    </button>
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
