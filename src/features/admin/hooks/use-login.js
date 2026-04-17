import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../shared/api/instance'
import { loginSchema } from '../../../shared/lib/schemas'

export function useLogin() {
  const [form, setForm] = useState({ login: '', pass: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const login = async (e) => {
    e.preventDefault()
    const result = loginSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors = {}
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0]] = issue.message
      }
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    setServerError(null)
    setLoading(true)
    try {
      const data = await api.post('/auth/login', { login: form.login, password: form.pass })
      localStorage.setItem('token', data.accessToken)
      navigate('/admin/products')
    } catch {
      setServerError('Неверный логин или пароль')
    } finally {
      setLoading(false)
    }
  }

  return { form, setForm, errors, serverError, loading, login }
}
