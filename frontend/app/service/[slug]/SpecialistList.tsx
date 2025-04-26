'use client'

import { fetchSpecialistsBySlug } from '@/app/api/categories/categoriesApi'
import { useQuery } from '@tanstack/react-query'

interface SpecialistListProps {
	slug: string
}

interface ISpecialists {
	id: string
	first_name: string
	last_name: string
}

const SpecialistList = ({ slug }: SpecialistListProps) => {
	const { data, isLoading } = useQuery({
		queryKey: ['specialists', slug],
		queryFn: () => fetchSpecialistsBySlug(slug),
	})

	if (isLoading) return <div>Loading specialists...</div>

	return (
		<div>
			<h2>Специалисты</h2>
			{JSON.stringify(data, null, 2)}
			<ul>
				{data.specialists.map((specialist: ISpecialists) => (
					<li key={specialist.id}>
						{specialist.first_name} {specialist.last_name}
					</li>
				))}
			</ul>
		</div>
	)
}

export default SpecialistList
