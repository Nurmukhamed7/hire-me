'use client'

import { useVerify } from '@/hooks/useVerify'
import { ToastContainer } from 'react-toastify'

export default function Setup() {
	useVerify()

	return <ToastContainer />
}
