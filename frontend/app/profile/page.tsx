'use client'
import SocialButtons from '@/components/SocialButtons'
import { getUser } from '@/services/auth.service'
import { useQuery } from '@tanstack/react-query'

const page = () => {
	const { data: user } = useQuery({
		queryKey: ['user'],
		queryFn: () => getUser(),
		retry: false,
	})

	return (
		<div>
			<h1>Profile page</h1>
			<SocialButtons />
			{user ? <h2>{JSON.stringify(user, null, 2)}</h2> : <h2>netu</h2>}
		</div>
	)
}

export default page
