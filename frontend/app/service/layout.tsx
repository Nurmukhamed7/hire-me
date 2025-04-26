import ServiceNavigation from '@/components/ServiceNavigation'
import React from 'react'

const layout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	return (
		<div>
			<ServiceNavigation />
			{children}
		</div>
	)
}

export default layout
