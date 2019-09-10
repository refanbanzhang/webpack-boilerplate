import axios from 'axios'

axios.defaults.baseURL = ''



export default () => {
  // Add a request interceptor
  axios.interceptors.request.use(
    function (config) {
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  axios.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      error.msg = '服务器忙，请稍后再试!'
      return Promise.reject(error)
    }
  )
}