'use client'

import { useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import CategoryItem from './CategoryItem'

const CategoryList = () => {
	const { data: categories, isLoading } = useCategories()
	const [expandedCategory, setExpandedCategory] = useState<number | null>(null)

	if (isLoading) return <p>Loading categories...</p>

	return (
		<div>
			{categories.map((category: any) => (
				<CategoryItem
					key={category.id}
					category={category}
					isExpanded={expandedCategory === category.id}
					toggleExpand={() =>
						setExpandedCategory(
							category.id === expandedCategory ? null : category.id
						)
					}
				/>
			))}
		</div>
	)
}

export default CategoryList
