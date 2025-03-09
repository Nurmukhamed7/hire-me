import { fetchWorksBySlug } from '@/app/api/categories/categoriesApi'
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query'
import ClientComponent from './ClientComponent'

interface Props {
	params: Promise<{ slug: string }>
}

const ServicePage = async ({ params }: Props) => {
	const { slug } = await params

	const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ['works', slug],
		queryFn: () => fetchWorksBySlug(slug),
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ClientComponent slug={slug} />
		</HydrationBoundary>
	)
}

export default ServicePage
