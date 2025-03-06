'use client'

import axiosInstance from '@/utils/axiosInstance'
import { useQuery } from '@tanstack/react-query'

export const fetchCategories = async () => {
	const { data } = await axiosInstance.get('/categories/')
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
		`/services?category_id=${categoryId}`
	)
	return data
}

export const useServices = (categoryId: number | null) => {
	return useQuery({
		queryKey: ['services', categoryId],
		queryFn: () => fetchServices(categoryId!),
		enabled: !!categoryId, // Only fetch when categoryId is available
		staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
	})
}
