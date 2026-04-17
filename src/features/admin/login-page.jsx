import { useLogin } from './hooks/use-login'
import './login-page.css'

export default function LoginPage() {
  const { form, setForm, errors, serverError, loading, login } = useLogin()

  return (
    <div className="auth-wrap">
      <form className="card auth-form" onSubmit={login}>
        <div className="auth-logo"><span>Trade</span><span>Fix</span></div>
        <h2>Вход в систему</h2>
        <p className="auth-sub">Панель управления</p>
        {serverError && <div className="msg error">{serverError}</div>}
        <label>Логин</label>
        <input
          className={errors.login ? 'input-error' : ''}
          placeholder="admin"
          value={form.login}
          onChange={e => setForm({ ...form, login: e.target.value })}
        />
        {errors.login && <span className="field-error">{errors.login}</span>}
        <label>Пароль</label>
        <input
          type="password"
          className={errors.pass ? 'input-error' : ''}
          placeholder="••••••••"
          value={form.pass}
          onChange={e => setForm({ ...form, pass: e.target.value })}
        />
        {errors.pass && <span className="field-error">{errors.pass}</span>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  )
}
