import { getUser } from '@/services/auth.service'
import { useAuthStore } from '@/store'
import { useEffect } from 'react'

export const useVerify = () => {
	const setAuth = useAuthStore(s => s.setAuth)
	const logout = useAuthStore(s => s.logout)
	const finishInitialLoad = useAuthStore(s => s.finishInitialLoad)

	useEffect(() => {
		const verifyUser = async () => {
			try {
				await getUser()
				setAuth()
			} catch {
				logout()
			} finally {
				finishInitialLoad()
			}
		}

		verifyUser()
	}, [setAuth, logout, finishInitialLoad])
}
