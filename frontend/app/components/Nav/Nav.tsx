import Link from 'next/link'

const MobileNav = () => {
	return (
		<nav className='fixed bottom-0 max-w-[420px] mx-auto flex justify-around items-center'>
			<div className='flex gap-4'>
				<Link className='underline' href='/'>
					NEXTjs
				</Link>
				<Link className='underline' href='/users'>
					users
				</Link>
			</div>
		</nav>
	)
}

export default MobileNav
