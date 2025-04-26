import { fetchSpecialistsBySlug } from '@/app/api/categories/categoriesApi'
import { getQueryClient } from '@/lib/get-query-client'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import SpecialistList from './SpecialistList'

interface Props {
	params: Promise<{ slug: string }>
}

const ServicePage = async ({ params }: Props) => {
	const { slug } = await params

	const queryClient = getQueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['specialists', slug],
		queryFn: () => fetchSpecialistsBySlug(slug),
	})

	return (
		<>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<SpecialistList slug={slug} />
			</HydrationBoundary>
		</>
	)
}

export default ServicePage
