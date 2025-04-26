'use client'

import { BriefcaseBusiness, Home, Search, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const BottomNavbar = () => {
	const pathname = usePathname()

	return (
		<nav className='fixed bottom-2 left-0 right-0 bg-primary max-w-[380px] mx-auto rounded-full py-3 px-7 flex justify-between'>
			<Link
				href='/'
				className={`flex flex-col items-center text-xs gap-1 transition-colors ${
					pathname === '/' ? 'text-white' : 'text-gray-400'
				}`}
			>
				<Home
					className={`w-7 h-7 ${
						pathname === '/' ? 'text-white' : 'text-gray-400'
					}`}
				/>
				<span className='text-[10px]'>Главная</span>
			</Link>

			<Link
				href='/catalog'
				className={`flex flex-col items-center text-xs gap-1 transition-colors ${
					pathname === '/catalog' ? 'text-white' : 'text-gray-400'
				}`}
			>
				<Search
					className={`w-7 h-7 ${
						pathname === '/catalog' ? 'text-white' : 'text-gray-400'
					}`}
				/>
				<span className='text-[10px]'>Каталог</span>
			</Link>

			<Link
				href='/work'
				className={`flex flex-col items-center text-xs gap-1 transition-colors ${
					pathname === '/work' ? 'text-white' : 'text-gray-400'
				}`}
			>
				<BriefcaseBusiness
					className={`w-7 h-7 ${
						pathname === '/work' ? 'text-white' : 'text-gray-400'
					}`}
				/>
				<span className='text-[10px]'>Работа</span>
			</Link>

			<Link
				href='/profile'
				className={`flex flex-col items-center text-xs gap-1 transition-colors ${
					pathname === '/profile' ? 'text-white' : 'text-gray-400'
				}`}
			>
				<User
					className={`w-7 h-7 ${
						pathname === '/profile' ? 'text-white' : 'text-gray-400'
					}`}
				/>
				<span className='text-[10px]'>Профиль</span>
			</Link>
		</nav>
	)
}

export default BottomNavbar
