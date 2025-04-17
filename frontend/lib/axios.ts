import { useAuthStore } from '@/store'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	withCredentials: true,
})

axiosInstance.interceptors.response.use(
	res => res,
	async (error: AxiosError) => {
		const originalRequest = error.config as AxiosRequestConfig & {
			_retry?: boolean
		}
		console.log('originalRequest', originalRequest)
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			try {
				await axiosInstance.post('/auth/jwt/refresh/')
				useAuthStore.getState().setAuth()
				return axiosInstance(originalRequest)
			} catch {
				useAuthStore.getState().logout()
			}
		}
		return Promise.reject(error)
	}
)
