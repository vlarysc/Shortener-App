import { api } from 'src/boot/axios'

export default function useAuthUser () {
  const login = async ({ email, password }) => {
    try {
      const user = await api.post('users/login', { email, password })
      localStorage.setItem('token', user.data.token)
      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  const logout = async () => {
    window.location.reload(true)
  }

  const register = async ({ name, email, password }) => {
    try {
      const user = await api.post('users/signUp', { name, email, password })
      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  return {

    login,
    logout,
    register
  }
}
