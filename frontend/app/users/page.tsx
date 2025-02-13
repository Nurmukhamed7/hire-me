interface User {
	id: number
	name: string
}

const UsersPage = async () => {
	const res = await fetch('https://jsonplaceholder.typicode.com/users', {
		cache: 'no-store',
	})
	const users: User[] = await res.json()

	// const sorted = sort(users).desc(u => u.name)

	return (
		<div>
			UsersPage
			<p>{new Date().toLocaleTimeString()}</p>
			<ul>
				{users.map(user => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
		</div>
	)
}

export default UsersPage
