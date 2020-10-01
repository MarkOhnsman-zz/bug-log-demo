import Axios from 'axios'

const base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'

export const api = Axios.create({
  baseURL: base + 'api/',
  timeout: 3000,
  withCredentials: true
})
