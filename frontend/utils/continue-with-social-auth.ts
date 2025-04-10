import { toast } from 'react-toastify'
import { axiosInstanceAuth } from './axiosInstance'

export default async function continueWithSocialAuth(
	provider: string,
	redirect: string
) {
	try {
		const redirectUri =
			process.env.NODE_ENV === 'production'
				? process.env.NEXT_PUBLIC_REDIRECT_URL
				: 'http://localhost:3000'

		const url = `/auth/o/${provider}/?redirect_uri=${redirectUri}/auth/${redirect}`

		const res = await axiosInstanceAuth.get(url)

		if (res.status === 200 && typeof window !== 'undefined') {
			window.location.replace(res.data.authorization_url)
		} else {
			toast.error('Something went wrong')
		}
	} catch (err) {
		toast.error('Something went wrong')
	}
}

export const continueWithGoogle = () =>
	continueWithSocialAuth('google-oauth2', 'google')
