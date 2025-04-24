'use client'

import { useWorksBySlug } from '@/app/api/categories/categoriesApi'
import Link from 'next/link'

type Work = {
	name: string
	slug: string
}

const ClientComponent = ({ slug }: { slug: string }) => {
	const { data: worksData, isLoading } = useWorksBySlug(slug)

	if (isLoading) return <div>Loading...</div>

	const works = worksData?.works ?? []

	return (
		<div>
			<div className='bg-neutral-100'>
				<h2>Filters:</h2>
				<div className='flex flex-col'>
					{works.length > 0 ? (
						works.map((work: Work) => (
							<Link href={work.slug} key={work.slug}>
								{work.name}
							</Link>
						))
					) : (
						<p>No works found.</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default ClientComponent
