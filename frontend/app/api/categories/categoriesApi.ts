import { axiosInstance } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

export const fetchCategories = async () => {
	const { data } = await axiosInstance.get('/api/categories/')
	return data
}

export const useCategories = () => {
	return useQuery({
		queryKey: ['mainCategories'],
		queryFn: fetchCategories,
	})
}

export const fetchServices = async (categoryId: number) => {
	const { data } = await axiosInstance.get(
		`/api/services/?category_id=${categoryId}`
	)
	return data
}

export const useServices = (categoryId: number | null) => {
	return useQuery({
		queryKey: ['services', categoryId],
		queryFn: () => fetchServices(categoryId!),
		enabled: !!categoryId,
	})
}

export const fetchWorksBySlug = async (slug: string) => {
	const { data } = await axiosInstance.get(`/api/works?slug=${slug}`)
	return data
}

export const useWorksBySlug = (slug: string) => {
	return useQuery({
		queryKey: ['works', slug],
		queryFn: () => fetchWorksBySlug(slug),
	})
}

export const fetchSpecialistsBySlug = async (slug: string) => {
	const { data } = await axiosInstance.get(`/api/specialists?slug=${slug}`)
	return data
}

export const useSpecialistsBySlug = (slug: string) => {
	return useQuery({
		queryKey: ['specialists', slug],
		queryFn: () => fetchSpecialistsBySlug(slug),
	})
}
