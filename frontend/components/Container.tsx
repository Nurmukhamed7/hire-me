import React from 'react'

function Container({ children }: { children: React.ReactNode }) {
	return (
		<div className='max-w-[420px] mx-auto flex flex-col min-h-screen bg-white'>
			<div className='px-5'>{children}</div>
		</div>
	)
}

export default Container
