// app/profile/loading.tsx
'use client'

import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingPage() {
	return (
		<div>
			<h1>Profile page</h1>
			<div className='space-y-4 mb-4'>
				<Skeleton className='h-8 w-1/2' /> {/* Имя пользователя */}
				<Skeleton className='h-6 w-1/3' /> {/* Email */}
			</div>
			<div className='space-y-2 mb-4'>
				<Skeleton className='h-10 w-full' /> {/* Social button 1 */}
				<Skeleton className='h-10 w-full' /> {/* Social button 2 */}
			</div>
			<Skeleton className='h-12 w-full' /> {/* Logout button */}
		</div>
	)
}
