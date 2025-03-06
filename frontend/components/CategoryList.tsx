'use client'
import { useCategories, useServices } from '@/app/api/categories/categoriesApi'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { useState } from 'react'

interface Category {
	id: number
	name: string
	slug: string
}

const CategoryList = () => {
	const { data: categories, isLoading, isError, error } = useCategories()
	const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

	// Fetch services when a category is clicked
	const { data: services, isLoading: servicesLoading } =
		useServices(selectedCategory)

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error fetching categories</div>

	return (
		<div className=''>
			<Accordion type='single' collapsible>
				{categories.map((category: Category) => (
					<AccordionItem key={category.id} value={category.slug}>
						<AccordionTrigger onClick={() => setSelectedCategory(category.id)}>
							{category.name}
						</AccordionTrigger>
						<AccordionContent>
							{servicesLoading ? (
								<div>Loading services...</div>
							) : services?.length ? (
								<ul>
									{services.map((service: { id: number; name: string }) => (
										<li key={service.id}>{service.name}</li>
									))}
								</ul>
							) : (
								<div>No services available</div>
							)}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	)
}

export default CategoryList
