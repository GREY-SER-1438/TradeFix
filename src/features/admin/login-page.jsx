import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login-page.css'

export default function LoginPage() {
  const [form, setForm] = useState({ login: '', pass: '' })
  const navigate = useNavigate()

  const login = (e) => {
    e.preventDefault()
    localStorage.setItem('accessToken', 'mock_admin_token_2026')
    navigate('/admin/products')
  }

  return (
    <div className="auth-wrap">
      <form className="card auth-form" onSubmit={login}>
        <div className="auth-logo"><span>Trade</span><span>Fix</span></div>
        <h2>Вход в систему</h2>
        <p className="auth-sub">Панель управления</p>
        <label>Логин</label>
        <input
          placeholder="admin"
          value={form.login}
          onChange={e => setForm({ ...form, login: e.target.value })}
          required
        />
        <label>Пароль</label>
        <input
          type="password"
          placeholder="••••••••"
          value={form.pass}
          onChange={e => setForm({ ...form, pass: e.target.value })}
          required
        />
        <button type="submit" className="btn btn-primary">Войти</button>
      </form>
    </div>
  )
}
