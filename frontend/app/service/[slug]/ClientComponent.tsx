'use client'

import { useWorksBySlug } from '@/app/api/categories/categoriesApi'

const ClientComponent = ({ slug }: { slug: string }) => {
	const { data: worksData, isLoading } = useWorksBySlug(slug)

	if (isLoading) return <div>Loading...</div>

	const works = worksData?.works ?? []

	return (
		<div>
			<div className='bg-neutral-100'>
				<h2>Filters:</h2>
				{works.length > 0 ? (
					works.map((work: any) => <div key={work.slug}>{work.name}</div>)
				) : (
					<p>No works found.</p>
				)}
			</div>
		</div>
	)
}

export default ClientComponent
