import { useRequestForm, useServices } from './hooks/use-request-form.js'
import './services-page.css'

export default function ServicesPage() {
  const { form, setForm, success, submit } = useRequestForm()
  const services = useServices()

  return (
    <div className="services-page">
      <h1>Услуги</h1>
      <p className="page-sub">Полный спектр услуг по обслуживанию торгового оборудования</p>
      <div className="services-layout">
        <div className="list">
          {services.map(s => (
            <div key={s.id} className="card service-item">
              <div className="service-item__header">
                <h3>{s.name}</h3>
                <span className="badge">{s.category}</span>
              </div>
              <p>{s.description}</p>
              <p className="price">от {Number(s.price).toLocaleString()} ₽</p>
            </div>
          ))}
        </div>
        <div className="form-box card">
          <h2>Заявка</h2>
          {success && <div className="msg success">✅ Заявка успешно отправлена!</div>}
          <form onSubmit={submit}>
            <input
              placeholder="Имя"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              placeholder="Телефон / Email"
              value={form.contact}
              onChange={e => setForm({ ...form, contact: e.target.value })}
              required
            />
            <select
              value={form.serviceId}
              onChange={e => setForm({ ...form, serviceId: e.target.value })}
              required
            >
              <option value="">Выберите услугу</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <textarea
              placeholder="Описание проблемы"
              rows="4"
              value={form.desc}
              onChange={e => setForm({ ...form, desc: e.target.value })}
              required
            />
            <button type="submit" className="btn btn-primary">Отправить заявку</button>
          </form>
        </div>
      </div>
    </div>
  )
}
