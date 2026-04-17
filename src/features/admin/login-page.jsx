import { useLogin } from './hooks/use-login'
import './login-page.css'

export default function LoginPage() {
  const { form, setForm, error, loading, login } = useLogin()

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
