'use client'

import { useCategories } from '@/entities/category/api/categoryApi'
import CategoryList from '@/entities/category/ui/CategoryList'

export default function CatalogPage() {
	const { data: categories, isLoading, isError, error } = useCategories()

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error fetching categories</div>

	return (
		<div>
			<h1>Catalog</h1>
			<CategoryList categories={categories} />
		</div>
	)
}
