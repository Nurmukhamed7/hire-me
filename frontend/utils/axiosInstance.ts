import axios from 'axios'

// 🌐 Универсальный axios instance
const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})

// // 🔁 Interceptor для автообновления access токена
// axiosInstance.interceptors.response.use(
// 	res => res,
// 	async err => {
// 		const originalRequest = err.config
// 		if (err.response?.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true
// 			try {
// 				await axios.post('/auth/jwt/refresh/', null, {
// 					baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
// 					withCredentials: true,
// 				})
// 				return axiosInstance(originalRequest)
// 			} catch (refreshError) {
// 				console.error('Token refresh failed', refreshError)
// 			}
// 		}
// 		return Promise.reject(err)
// 	}
// )

// 🧠 Универсальный API-клиент
// class ApiClient<T> {
// 	endpoint: string

// 	constructor(endpoint: string) {
// 		this.endpoint = endpoint
// 	}

// 	get = async () => {
// 		const res = await axiosInstance.get<T>(this.endpoint)
// 		return res.data
// 	}

// 	post = async (data?: T) => {
// 		const res = await axiosInstance.post<T>(this.endpoint, data)
// 		return res.data
// 	}

// 	oauth = (config: { params: T }) => {
// 		console.log(`config=${config}`)
// 		return axiosInstance.post(this.endpoint, null, {
// 			headers: {
// 				'Content-Type': 'application/x-www-form-urlencoded',
// 				Accept: 'application/json',
// 			},
// 		})
// 	}
// }

export default axiosInstance
// export { ApiClient }
