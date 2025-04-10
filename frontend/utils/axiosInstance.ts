import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
	headers: {
		'Content-Type': 'application/json',
	},
})

export const axiosInstanceAuth = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	headers: {
		Accept: 'application/json',
	},
	withCredentials: true,
})

export default axiosInstance
