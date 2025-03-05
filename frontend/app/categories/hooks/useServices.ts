'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchServices } from '../services/serviceService'

export const useServices = (categoryId: number | null) => {
	return useQuery({
		queryKey: ['services', categoryId],
		queryFn: () => fetchServices(categoryId!),
		enabled: !!categoryId,
		staleTime: 1000 * 60 * 5,
	})
}
