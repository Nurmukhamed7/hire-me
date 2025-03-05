'use client'

import ServiceList from './ServiceList'

interface CategoryItemProps {
	category: any
	isExpanded: boolean
	toggleExpand: () => void
}

const CategoryItem: React.FC<CategoryItemProps> = ({
	category,
	isExpanded,
	toggleExpand,
}) => {
	return (
		<div>
			<button onClick={toggleExpand} className='bg-orange-400'>
				{category.name} ({category.services_count} категорий)
			</button>
			{isExpanded && <ServiceList categoryId={category.id} />}
		</div>
	)
}

export default CategoryItem
