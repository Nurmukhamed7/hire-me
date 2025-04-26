'use client'

import { fetchWorksBySlug } from '@/app/api/categories/categoriesApi'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ScrollArea, ScrollBar } from './ui/scroll-area'

export default function ServiceNavigation() {
	const pathname = usePathname()
	const slug = pathname.split('/').filter(Boolean).pop() || ''

	const { data, isPending, isError } = useQuery({
		queryKey: ['works', slug],
		queryFn: () => fetchWorksBySlug(slug),
		// staleTime: 5 * 60 * 1000,
		placeholderData: keepPreviousData,
	})

	if (isPending) return <div>Загрузка...</div>
	if (isError) return <div>Ошибка загрузки</div>

	const services = data?.works || []

	return (
		<ScrollArea className='w-full whitespace-nowrap'>
			<div className='flex gap-2 py-4'>
				{services.map((service: { name: string; slug: string }) => {
					const isActive = pathname.includes(service.slug)

					return (
						<Link
							key={service.slug}
							href={`/service/${service.slug}`}
							className={`
							inline-flex items-center justify-center
							px-4 py-2 rounded-full text-sm font-medium transition-colors
							focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
							${
								isActive
									? 'bg-primary text-primary-foreground hover:bg-primary/90'
									: 'bg-muted text-foreground hover:bg-muted/80'
							}
						`}
						>
							{service.name}
						</Link>
					)
				})}
			</div>
			<ScrollBar orientation='horizontal' className='hidden' />
		</ScrollArea>
	)
}
