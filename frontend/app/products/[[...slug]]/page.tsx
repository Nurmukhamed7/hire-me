interface ProductPageProps {
	params: { slug: string[] }
	searchParams: { sortOrder: string }
}

const ProductPage = ({
	params: { slug },
	searchParams: { sortOrder },
}: ProductPageProps) => {
	return (
		<div>
			ProductPage slug={slug} sortOrder={sortOrder}
		</div>
	)
}

export default ProductPage
