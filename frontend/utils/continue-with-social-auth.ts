import axios from 'axios'
import { toast } from 'react-toastify'

export default async function continueWithSocialAuth(
	provider: string,
	redirect: string
) {
	try {
		const redirectUri =
			process.env.NODE_ENV === 'production'
				? process.env.NEXT_PUBLIC_REDIRECT_URL
				: 'http://localhost:3000'

		const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/o/${provider}/?redirect_uri=${redirectUri}/auth/${redirect}`

		const res = await axios.get(url, {
			headers: {
				Accept: 'application/json',
			},
			withCredentials: true,
		})

		const data = res.data

		if (res.status === 200 && typeof window !== 'undefined') {
			window.location.replace(data.authorization_url)
		} else {
			toast.error('Something went wrong')
		}
	} catch (err) {
		toast.error('Something went wrong')
	}
}
