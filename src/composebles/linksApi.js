import { api } from 'src/boot/axios'

export default function linksApi (url) {
  const get = async () => {
    try {
      const { data } = await api.get(url)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
  const post = async (form) => {
    try {
      const { data } = await api.post(`${url}/new`, form)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
  const update = async (form) => {
    try {
      const { data } = await api.put(`${url}/${form.id}`, form)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
  const del = async (id) => {
    try {
      const { data } = await api.delete(`${url}/${id}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const redirect = async (id) => {
    try {
      const { data } = await api.get(`${url}${id}`)
      /* data.replace('http://localhost:8080/', '') */
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    get,
    post,
    update,
    del,
    redirect
  }
}
