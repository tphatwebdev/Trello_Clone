import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/formatters'

// khởi tạo 1 đối tượng Axios (AuthorizeAxiosInstance) để custom và cấu hình chung cho dự án
let authorizeAxiosInstance = axios.create()
// thời gian chờ tối đa của 1 request: để 10p
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10
// withCredentials: sẽ cho phép axios tự động gửi cookie trong mỗi request lên BE
// phục vụ việc lưu JWT tokens (refresh & access) vào trong httpOnly Cookie của trình duyệt
authorizeAxiosInstance.defaults.withCredentials = true

/**
 * Cấu hình Interceptors (bộ đánh chặn vào giữa mọi request & response)
 */
// Add a request interceptor: can thiệp vào giữa những cái request
authorizeAxiosInstance.interceptors.request.use(
  (config) => {
    // kỹ thuật chặn spam click
    interceptorLoadingElements(true)
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor: can thiệp vào giữa những cái response nhận về
authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    // kỹ thuật chặn spam click
    interceptorLoadingElements(false)
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // mọi mã http status code nằm ngoài khoảng 200-300 là sẽ error và rơi vào đây

    // kỹ thuật chặn spam click
    interceptorLoadingElements(false)

    // xử lý tập trung phần hiển thị thông báo lỗi trả về từ mọi API
    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
    }
    // dùng toastify hiển thị all lỗi lên. ngoại trừ 410 - GONE phục vụ việc tự động refresh lại token
    if (error.response?.status !== 410) {
      toast.error(errorMessage)
    }
    return Promise.reject(error)
  }
)

export default authorizeAxiosInstance