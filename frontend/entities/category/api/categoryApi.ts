'use client'

import axiosInstance from '@/shared/api/axiosClient'
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
