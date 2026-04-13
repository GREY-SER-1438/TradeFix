import { Link } from 'react-router-dom'
import { Wrench, Settings, Store, Phone, ClipboardList, Search, CheckCircle } from 'lucide-react'
import './home-page.css'

const services = [
  { id: 1, Icon: Wrench, name: 'Ремонт витрин', desc: 'Диагностика, замена компрессоров и ТЭНов. Выезд в день обращения.' },
  { id: 2, Icon: Settings, name: 'ТО кассового ПО', desc: 'Обновление прошивок, чистка механизмов, калибровка.' },
  { id: 3, Icon: Store, name: 'Продажа стеллажей', desc: 'Поставка и монтаж торговых систем под ключ.' },
]

const stats = [
  { value: '10+', label: 'лет на рынке' },
  { value: '500+', label: 'клиентов' },
  { value: '1 день', label: 'срок выезда' },
  { value: '24 мес', label: 'гарантия на работы' },
]

const steps = [
  { Icon: Phone,         num: '01', title: 'Заявка',       desc: 'Оставьте заявку на сайте или позвоните — менеджер свяжется в течение часа.' },
  { Icon: Search,        num: '02', title: 'Диагностика',  desc: 'Мастер выезжает на объект, осматривает оборудование и называет точную стоимость.' },
  { Icon: Wrench,        num: '03', title: 'Ремонт',       desc: 'Устраняем неисправность в согласованные сроки, используем оригинальные запчасти.' },
  { Icon: CheckCircle,   num: '04', title: 'Приёмка',      desc: 'Проверяете работу оборудования на месте и подписываете акт выполненных работ.' },
]

const advantages = [
  { title: 'Собственный склад запчастей', desc: 'Более 2000 позиций в наличии — не ждём поставки неделями.' },
  { title: 'Фиксированные цены', desc: 'Стоимость согласовывается до начала работ и не меняется.' },
  { title: 'Выезд по всему региону', desc: 'Обслуживаем Москву и Московскую область, выезд от 2 часов.' },
  { title: 'Работаем с юрлицами', desc: 'Договор, закрывающие документы, НДС — всё оформляем официально.' },
]

export default function HomePage() {
  return (
    <div className="home">

      <section className="hero">
        <h1>Ремонт и продажа торгового оборудования</h1>
        <p>Оперативный выезд, гарантия на все работы, прозрачное ценообразование.</p>
        <div className="hero__actions">
          <Link to="/services" className="btn-hero btn-hero-primary">Оставить заявку</Link>
          <Link to="/catalog" className="btn-hero btn-hero-secondary">Смотреть каталог</Link>
        </div>
      </section>

      <section className="stats">
        {stats.map(s => (
          <div key={s.label} className="stats__item">
            <span className="stats__value">{s.value}</span>
            <span className="stats__label">{s.label}</span>
          </div>
        ))}
      </section>

      <section className="section">
        <h2 className="section-title">Наши услуги</h2>
        <p className="section-subtitle">Полный цикл обслуживания торгового оборудования</p>
        <div className="services-preview__grid">
          {services.map(s => (
            <div key={s.id} className="service-card">
              <div className="service-card__icon"><s.Icon size={20} /></div>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
              <Link to="/services">Подробнее →</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Как мы работаем</h2>
        <p className="section-subtitle">Четыре шага от заявки до готового результата</p>
        <div className="steps">
          {steps.map(s => (
            <div key={s.num} className="step">
              <div className="step__head">
                <span className="step__num">{s.num}</span>
                <div className="step__icon"><s.Icon size={18} /></div>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Почему выбирают нас</h2>
        <p className="section-subtitle"> </p>
        <div className="advantages">
          {advantages.map(a => (
            <div key={a.title} className="advantage">
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="cta__inner">
          <h2>Нужен ремонт или техобслуживание?</h2>
          <p>Оставьте заявку — перезвоним в течение часа и согласуем удобное время выезда.</p>
          <Link to="/services" className="btn-hero btn-hero-primary">Оставить заявку</Link>
        </div>
      </section>

    </div>
  )
}
