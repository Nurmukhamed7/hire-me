interface UserDetailPageProps {
	params: {
		id: number
	}
}

const UserDetailPage = ({ params: { id } }: UserDetailPageProps) => {
	return <div>UserDetailPage id={id}</div>
}

export default UserDetailPage
