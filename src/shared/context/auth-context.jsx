import { createContext, useCallback, useContext, useReducer } from 'react'
import { api } from '../api/instance'

const AuthContext = createContext(null)

const initialState = {
  loading: false,
  user: null,
  error: null,
}

function authReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, user: action.payload }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'LOGOUT':
      return { ...initialState }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const getMe = useCallback(async () => {
    dispatch({ type: 'FETCH_START' })
    try {
      const data = await api.get('/user/me')
      dispatch({ type: 'FETCH_SUCCESS', payload: data })
    } catch (e) {
      dispatch({ type: 'FETCH_ERROR', payload: e.message })
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, getMe, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
