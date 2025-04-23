import { axiosInstance } from '@/lib/axios'

export const getSpecialists = async (slug: string) => {
	const { data } = await axiosInstance.get(`/api/specialists/?slug=${slug}`)
	return data
}
