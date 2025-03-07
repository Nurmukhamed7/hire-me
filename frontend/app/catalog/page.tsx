import CategoryList from '@/components/CategoryList'
import { getQueryClient } from '@/lib/get-query-client'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { fetchCategories } from '../api/categories/categoriesApi'

const CatalogPage = async () => {
	const queryClient = getQueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['mainCategories'],
		queryFn: fetchCategories,
	})

	return (
		<div>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<CategoryList />
			</HydrationBoundary>
		</div>
	)
}

export default CatalogPage
