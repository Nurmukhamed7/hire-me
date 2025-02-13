import Link from 'next/link'

const NavBar = () => {
	return (
		<div className='flex gap-4'>
			<Link className='underline' href='/'>
				NEXTjs
			</Link>
			<Link className='underline' href='/users'>
				users
			</Link>
		</div>
	)
}

export default NavBar
