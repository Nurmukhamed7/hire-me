'use client'

import axiosInstance from '@/shared/api/axiosClient'
import { useQuery } from '@tanstack/react-query'

export const fetchServices = async (categoryId: number) => {
	const { data } = await axiosInstance.get(
		`/services?category_id=${categoryId}`
	)
	return data
}

export const useServices = (categoryId: number) => {
	return useQuery({
		queryKey: ['services', categoryId],
		queryFn: () => fetchServices(categoryId),
		enabled: !!categoryId, // Only fetch when categoryId is available
		staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
	})
}
