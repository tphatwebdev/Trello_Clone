import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/formatters'
import { refreshTokenAPI } from '~/apis'
import { logoutUserAPI } from '~/redux/user/userSlice'

/**không thể import { store } from '~/redux/store' theo cách thông thường trong file .js
 * giải pháp: Inject store: kỹ thuật khi cần sử dụng biến redux store ở các file ngoài phạm vi component
 * khi start ứng dụng. từ trong file main.jsx ta gọi hàm injectStore ngay lập tức để gán biến mainStore vào biến axiosReduxStore cục bộ trong file này
*/

let axiosReduxStore
export const injectStore = mainStore => {axiosReduxStore = mainStore}

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

// khởi tạo 1 cái promise cho việc gọi api refresh_token
// mục đích: tạo promise để khi nào gọi api refresh_token xong xuôi thì mới retry lại nhiều api bị lỗi trước đó
let refreshTokenPromise = null


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

    // xử lí refresh token tự động
    // trường hợp 1: nếu nhận mã lỗi 401 từ BE -> gọi API đăng xuất
    if (error.response?.status === 401) {
      axiosReduxStore.dispatch(logoutUserAPI(false))
    }
    // trường hợp 2: nhận mã 410 từ BE gọi API refresh token để làm mới lại accessToken
    // B1: lấy các request API đang bị lỗi thông qua error.config
    const originalRequests = error.config
    if (error.response?.status === 410 && !originalRequests._retry) {
      // gán thêm 1 giá trị _retry luôn = true trong khoảng thời gian chờ, đảo bảo việc refreshToken này chỉ gọi 1 lần trong 1 thời điểm
      originalRequests._retry = true
      // kiểm tra xem nếu chưa có refreshTokenPromise thì thực hiện gán việc gọi api refresh_token. đồng thời gán vào cho cái refreshTokenPromise
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then(data => {
            // đồng thời accessToken đã nằm trong httpOnly cookie (xử lý từ phía BE)
            return data?.accessToken
          })
          .catch((_error) => {
            // nếu nhận được bất kì lỗi nào từ api refresh token thì logout
            axiosReduxStore.dispatch(logoutUserAPI(false))
            return Promise.reject(_error)
          })
          .finally(() => {
            //  dù api có ok hay lỗi thì vẫn luôn gán lại cái refreshTokenPromise về null như ban đầu
            refreshTokenPromise = null
          })
      }

      // cần return trường hợp refreshTokenPromise chạy thành công và xử lý thêm ở đây:
      return refreshTokenPromise.then(accessToken => {
        // return axios instance kết hợp các originalRequests để gọi lại những api ban đầu bị lỗi
        return authorizeAxiosInstance(originalRequests)
      })
    }

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