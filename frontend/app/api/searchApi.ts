import { axiosInstance } from '@/lib/axios'

export const getList = async (filter: string) => {
	const { data } = await axiosInstance.get(`/api/works/?search=${filter}`)
	return data
}
