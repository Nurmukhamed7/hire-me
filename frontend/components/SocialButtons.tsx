'use client'

import { continueWithGoogle } from '@/utils'
import { useState } from 'react'
import GoogleIcon from './GoogleIcon'
import SocialButton from './SocialButton'

const SocialButtons = () => {
	const [loading, setLoading] = useState(false)

	const handleClick = async () => {
		setLoading(true) // Показали загрузку
		await continueWithGoogle()
		// Здесь уже редирект, дальше код не нужен
	}
	return (
		<div>
			<SocialButton provider='google' onClick={handleClick} loading={loading}>
				<GoogleIcon /> Sign in with Google
			</SocialButton>
		</div>
	)
}

export default SocialButtons
