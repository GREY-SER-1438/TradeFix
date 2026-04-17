import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../shared/api/instance'
import './login-page.css'

export default function LoginPage() {
  const [form, setForm] = useState({ login: '', pass: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const login = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const data = await api.post('/auth/login', { login: form.login, password: form.pass })
      localStorage.setItem('token', data.accessToken)
      navigate('/admin/products')
    } catch (err) {
      setError('Неверный логин или пароль')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrap">
      <form className="card auth-form" onSubmit={login}>
        <div className="auth-logo"><span>Trade</span><span>Fix</span></div>
        <h2>Вход в систему</h2>
        <p className="auth-sub">Панель управления</p>
        {error && <div className="msg error">{error}</div>}
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
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  )
}
