import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import './dashboard-page.css'

const tabs = [
  { path: '/admin/products', label: 'Товары' },
  { path: '/admin/services', label: 'Услуги' },
  { path: '/admin/requests', label: 'Заявки' },
]

export default function DashboardPage() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="admin">
      <header className="admin-header">
        <h2>Панель управления</h2>
        <nav>
          {tabs.map(t => (
            <NavLink
              key={t.path}
              to={t.path}
              className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
            >
              {t.label}
            </NavLink>
          ))}
          <button onClick={logout} className="btn btn-danger">Выйти</button>
        </nav>
      </header>
      <div className="admin-content card">
        <Outlet />
      </div>
    </div>
  )
}
