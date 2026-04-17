import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../shared/api/instance'

export function useLogin() {
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
    } catch {
      setError('Неверный логин или пароль')
    } finally {
      setLoading(false)
    }
  }

  return { form, setForm, error, loading, login }
}
