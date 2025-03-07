'use client'
import { useCategories, useServices } from '@/app/api/categories/categoriesApi'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'
import { useState } from 'react'

interface Category {
	id: number
	name: string
	slug: string
	services_count: number
}

interface Service {
	id: number
	name: string
	slug: string
	category: number
	works: []
}

const CategoryList = () => {
	const { data: categories, isLoading, isError, error } = useCategories()
	const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

	// Fetch services when a category is clicked
	const { data: services, isLoading: servicesLoading } =
		useServices(selectedCategory)

	if (isLoading) return <div>Loading from CategoryList...</div>
	if (isError) return <div>Error fetching categories</div>

	return (
		<div className=''>
			<Accordion type='single' collapsible>
				{categories.map((category: Category) => (
					<AccordionItem key={category.id} value={category.slug}>
						<AccordionTrigger onClick={() => setSelectedCategory(category.id)}>
							<div className='flex flex-col justify-between w-full'>
								<span>{category.name}</span>
								<span className='text-gray-500'>
									{category.services_count} Категорий
								</span>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							{servicesLoading ? (
								<div>Loading services...</div>
							) : services?.length ? (
								<ul>
									{services.map((service: Service) => (
										<li key={service.id}>
											<Link
												href={`/service/${service.slug}`}
												className='hover:underline'
											>
												{service.name}
											</Link>
										</li>
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
