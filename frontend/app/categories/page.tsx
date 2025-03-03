'use client' // Mark this as a Client Component

import { useCategories } from './hooks/useCategories'

export default function CategoriesPage() {
	const { data, isLoading, isError } = useCategories()

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error fetching data</div>

	return (
		<div>
			<h1 className='bg-red-500'>Categories</h1>
			<ul>
				{data.map((category: any) => (
					<li key={category.id}>{category.name}</li>
				))}
			</ul>
		</div>
	)
}
