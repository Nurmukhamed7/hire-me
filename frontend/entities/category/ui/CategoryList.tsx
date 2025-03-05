'use client'

import { useServices } from '@/features/service/api/serviceApi'
import { useState } from 'react'

interface Category {
	id: number
	name: string
	slug: string
}

interface CategoryListProps {
	categories: Category[]
}

interface Service {
	id: number
	name: string
	works: Array<{
		id: number
		name: string
	}>
}

export default function CategoryList({ categories }: CategoryListProps) {
	const [openCategoryId, setOpenCategoryId] = useState<number | null>(null)

	const toggleCategory = (categoryId: number) => {
		setOpenCategoryId(prevId => (prevId === categoryId ? null : categoryId))
	}

	return (
		<div>
			{categories.map(category => (
				<div key={category.id}>
					<button onClick={() => toggleCategory(category.id)}>
						{category.name}
					</button>
					{openCategoryId === category.id && (
						<ServiceList categoryId={category.id} />
					)}
				</div>
			))}
		</div>
	)
}

function ServiceList({ categoryId }: { categoryId: number }) {
	const { data: services, isLoading, isError } = useServices(categoryId)

	if (isLoading) return <div>Loading services...</div>
	if (isError) return <div>Error fetching services</div>

	return (
		<div>
			{services.map((service: Service) => (
				<div key={service.id}>
					<h3>{service.name}</h3>
					<ul>
						{service.works.map(work => (
							<li key={work.id}>{work.name}</li>
						))}
					</ul>
				</div>
			))}
		</div>
	)
}
