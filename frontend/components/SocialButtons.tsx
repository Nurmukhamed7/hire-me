'use client'

import { continueWithGoogle } from '@/utils'
import SocialButton from './SocialButton'

const SocialButtons = () => {
	return (
		<div>
			<SocialButton provider='google' onClick={continueWithGoogle}>
				Sign in with Google
			</SocialButton>
		</div>
	)
}

export default SocialButtons
