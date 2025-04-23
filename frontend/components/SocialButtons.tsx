'use client'

import { continueWithGoogle } from '@/utils'
import GoogleIcon from './GoogleIcon'
import SocialButton from './SocialButton'

const SocialButtons = () => {
	return (
		<div>
			<SocialButton provider='google' onClick={continueWithGoogle}>
				<GoogleIcon /> Sign in with Google
			</SocialButton>
		</div>
	)
}

export default SocialButtons
