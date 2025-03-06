import React from 'react'

function Container({ children }: { children: React.ReactNode }) {
	return (
		<div className='max-w-[420px] mx-auto flex flex-col min-h-screen bg-white'>
			{children}
		</div>
	)
}

export default Container
