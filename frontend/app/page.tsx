'use client'
import { Button } from '@/components/ui/button'
import { getUser } from '@/services/auth.service'
import { useQuery } from '@tanstack/react-query'

export default function HomePage() {
	const { data: user } = useQuery({
		queryKey: ['user'],
		queryFn: () => getUser(),
		retry: false,
	})

	return (
		<div>
			HomePage
			<Button>Click me</Button>
			{user ? <h2>{JSON.stringify(user, null, 2)}</h2> : <h2>netu</h2>}
		</div>
	)
}
