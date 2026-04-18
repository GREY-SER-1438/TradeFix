import { useLogin } from './hooks/use-login'
import './login-page.css'

export default function LoginPage() {
  const { form, setForm, serverError, loading, login } = useLogin()

  return (
    <div className="auth-wrap">
      <form className="card auth-form" onSubmit={login}>
        <div className="auth-logo"><span>Trade</span><span>Fix</span></div>
        <h2>Вход в систему</h2>
        <p className="auth-sub">Панель управления</p>
        {serverError && <div className="msg error">{serverError}</div>}
        <label>Логин</label>
        <input
          placeholder="admin"
          value={form.login}
          onChange={e => setForm({ ...form, login: e.target.value })}
        />
        <label>Пароль</label>
        <input
          type="password"
          placeholder="••••••••"
          value={form.pass}
          onChange={e => setForm({ ...form, pass: e.target.value })}
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  )
}
