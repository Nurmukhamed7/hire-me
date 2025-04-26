'use client'

import { getUser, socialAuthenticate } from '@/services/auth.service'
import { useAuthStore } from '@/store'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export default function GooglePage() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const setAuth = useAuthStore(s => s.setAuth)
	const logout = useAuthStore(s => s.logout)

	useEffect(() => {
		const state = searchParams.get('state')
		const code = searchParams.get('code')

		if (!state || !code) return

		const loginWithGoogle = async () => {
			try {
				await socialAuthenticate({ provider: 'google-oauth2', state, code })
				await getUser()
				setAuth()
				toast.success('Logged In Successfully')
				router.push('/')
			} catch {
				logout()
				toast.error('Login failed. Please try again.')
				router.push('/profile')
			}
		}

		loginWithGoogle()
	}, [searchParams, setAuth, logout, router])

	return <p>Logging in via Google...</p>
}
