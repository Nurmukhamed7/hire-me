'use client'

import { useVerify } from '@/hooks/useVerify'
import { ToastContainer } from 'react-toastify'

export default function Setup() {
	useVerify()

	return (
		<ToastContainer
			position='top-center'
			autoClose={3000}
			pauseOnHover={false}
			style={{ width: '380px' }}
		/>
	)
}
