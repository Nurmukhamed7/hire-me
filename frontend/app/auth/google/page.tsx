import { Suspense } from 'react'
import GooglePage from './GooglePage'

export const dynamic = 'force-dynamic'

export default function Page() {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<GooglePage />
		</Suspense>
	)
}
