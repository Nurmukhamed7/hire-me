import React from 'react'
import BottomNavbar from './BottomNavbar'
import SearchBar from './SearchBar'

function Container({ children }: { children: React.ReactNode }) {
	return (
		<div className='max-w-[420px] mx-auto flex flex-col min-h-screen bg-white'>
			<div className='px-5'>
				<SearchBar />
				{children}
			</div>
			<BottomNavbar />
		</div>
	)
}

export default Container
