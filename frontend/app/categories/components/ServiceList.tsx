'use client'

import { useServices } from '../hooks/useServices'

const ServiceList = ({ categoryId }: { categoryId: number }) => {
	const { data: services, isLoading } = useServices(categoryId)

	if (isLoading) return <p>Loading services...</p>

	return (
		<ul>
			{services.map((service: any) => (
				<li className='bg-green-300' key={service.id}>
					{service.name}
				</li>
			))}
		</ul>
	)
}

export default ServiceList
