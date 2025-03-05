// entities/service/ui/ServiceItem.tsx
import React from 'react'

interface ServiceItemProps {
	id: number
	name: string
	slug: string
	works: Array<{ id: number; name: string; slug: string }>
}

export const ServiceItem: React.FC<ServiceItemProps> = ({
	id,
	name,
	slug,
	works,
}) => {
	return (
		<div className='service-item'>
			<h4>{name}</h4>
			<ul>
				{works.map(work => (
					<li key={work.id}>{work.name}</li>
				))}
			</ul>
		</div>
	)
}
