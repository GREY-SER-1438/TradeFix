import { useState } from "react";
import { Trash2, X } from "lucide-react";
import { useRequests } from "./hooks/use-requests.js";
import "./tables.css";

const STATUS_LABELS = {
  new: "Новая",
  in_progress: "В работе",
  completed: "Готова",
};

function formatDate(v) {
  if (!v) return "—";
  const d = new Date(v);
  if (isNaN(d)) return String(v);
  return d.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function RequestDetailsModal({ request, onClose, onStatusChange, onDelete }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Заявка №{request.id}</h3>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <dl className="detail-list">
          <div className="detail-row">
            <dt>Клиент</dt>
            <dd>{request.clientName || "—"}</dd>
          </div>
          <div className="detail-row">
            <dt>Контакт</dt>
            <dd>{request.clientContact || "—"}</dd>
          </div>
          {request.createdAt && (
            <div className="detail-row">
              <dt>Создана</dt>
              <dd>{formatDate(request.createdAt)}</dd>
            </div>
          )}
          <div className="detail-row">
            <dt>Статус</dt>
            <dd>
              <span className={`status-badge ${request.status}`}>
                {STATUS_LABELS[request.status] ?? request.status}
              </span>
            </dd>
          </div>
          <div className="detail-row detail-row-block">
            <dt>Описание</dt>
            <dd>{request.description || "—"}</dd>
          </div>
          <label className="detail-status">
            <span>Изменить статус:</span>
            <select
              value={request.status}
              onChange={(e) => onStatusChange(request.id, e.target.value)}
            >
              <option value="new">Новая</option>
              <option value="in_progress">В работе</option>
              <option value="completed">Готова</option>
            </select>
          </label>
        </dl>

        <div className="modal-footer">
          <button
            className="btn btn-danger"
            onClick={() => {
              onDelete(request.id);
              onClose();
            }}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RequestsTable() {
  const { requests, changeStatus, deleteRequest } = useRequests();
  const [selected, setSelected] = useState(null);

  const currentSelected = selected
    ? (requests.find((r) => r.id === selected.id) ?? selected)
    : null;

  return (
    <div>
      {currentSelected && (
        <RequestDetailsModal
          request={currentSelected}
          onClose={() => setSelected(null)}
          onStatusChange={changeStatus}
          onDelete={deleteRequest}
        />
      )}
      <div className="table-header">
        <h3>Заявки</h3>
      </div>
      <div className="table-wrap">
        <table className="admin-table requests-table">
          <colgroup>
            <col className="col-id" />
            <col />
            <col className="col-contact" />
            <col />
            <col className="col-status" />
            <col className="col-actions" />
          </colgroup>
          <thead>
            <tr>
              <th>ID</th>
              <th>Клиент</th>
              <th>Контакт</th>
              <th>Описание</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr
                key={r.id}
                className="row-clickable"
                onClick={() => setSelected(r)}
              >
                <td>{r.id}</td>
                <td>{r.clientName}</td>
                <td>{r.clientContact}</td>
                <td>{r.description}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <select
                    value={r.status}
                    onChange={(e) => changeStatus(r.id, e.target.value)}
                  >
                    <option value="new">Новая</option>
                    <option value="in_progress">В работе</option>
                    <option value="completed">Готова</option>
                  </select>
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <div className="actions">
                    <button
                      className="btn btn-danger icon-btn"
                      onClick={() => deleteRequest(r.id)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="table-empty">
                  <div className="table-empty-inner">
                    <div className="table-empty-title">Заявок пока нет</div>
                    <div className="table-empty-hint">
                      Новые заявки от клиентов появятся здесь автоматически
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
