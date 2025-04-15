// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { useRouter } from 'next/navigation'
// import { toast } from 'react-toastify'

// // const authClient = new ApiClient('/auth/o/google-oauth2/')

// const useGoogleAuth = () => {
// 	const client = useQueryClient()
// 	const router = useRouter()

// 	const { mutate, isPending } = useMutation({
// 		mutationFn: (data: { state: string; code: string }) =>
// 			authClient.oauth({ params: data }),
// 		onSuccess: async () => {
// 			toast.success('You are logged in')
// 			// await userService.get()
// 			await client.invalidateQueries({ queryKey: ['user'] })
// 			router.push('/profile')
// 		},

// 		onError: () => {
// 			toast.error('Log in failed')
// 			router.push('/profile')
// 		},
// 	})

// 	return {
// 		mutate,
// 		isPending,
// 	}
// }

// export default useGoogleAuth
