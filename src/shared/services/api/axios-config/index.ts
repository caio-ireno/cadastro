import axios from 'axios'

import { Environment } from '../../../environment'
//import { errorInterceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
  baseURL: Environment.URL_BASE,
  //'http://127.0.0.1:8000/api/'
})

Api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('Authorization header added:', config.headers.Authorization)
    } else {
      console.log('No token found in localStorage')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export { Api }
