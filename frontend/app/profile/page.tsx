'use client'
import SocialButtons from '@/components/SocialButtons'
import { Button } from '@/components/ui/button'
import UserItem from '@/components/UserItem'
import { getUser, logout as logoutApi } from '@/services/auth.service'
import { useAuthStore } from '@/store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const ProfilePage = () => {
	const queryClient = useQueryClient()
	const logout = useAuthStore(s => s.logout)

	const { data: user } = useQuery({
		queryKey: ['user'],
		queryFn: () => getUser(),
		retry: false,
	})

	const { mutate: handleLogout, isPending } = useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
			logout()
			queryClient.clear()
			toast.success('Вы успешно вышли из системы')
		},
		onError: () => {
			toast.error('Произошла ошибка при выходе')
		},
	})

	return (
		<div>
			<h1>Profile page</h1>

			{user ? (
				<div className='flex flex-col gap-2'>
					<UserItem
						name={`${user.first_name} ${user.last_name}`}
						description={user.email}
						style={{ width: '100%' }}
					/>

					<Button
						variant='destructive'
						size='lg'
						className='w-full'
						onClick={() => handleLogout()}
					>
						{isPending ? 'Выход...' : 'Log out'}
					</Button>
				</div>
			) : (
				<div className='flex flex-col'>
					<SocialButtons />
				</div>
			)}
		</div>
	)
}

export default ProfilePage
