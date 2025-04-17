import { axiosInstance } from '@/lib/axios'
import { CreateUserResponse, SocialAuthArgs, User } from '@/types/auth'

export const getUser = async (): Promise<User> => {
	const { data } = await axiosInstance.get('/auth/users/me/')
	return data
}

export const login = async (email: string, password: string) => {
	const { data } = await axiosInstance.post('/auth/jwt/create/', {
		email,
		password,
	})
	return data
}

export const verify = async () => {
	const { data } = await axiosInstance.post('/auth/jwt/verify/')
	return data
}

export const logout = async () => {
	await axiosInstance.post('/auth/logout/')
}

export const socialAuthenticate = async ({
	provider,
	state,
	code,
}: SocialAuthArgs): Promise<CreateUserResponse> => {
	const { data } = await axiosInstance.post(
		`/auth/o/${provider}/?state=${encodeURIComponent(
			state
		)}&code=${encodeURIComponent(code)}`,
		null,
		{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
	)
	return data
}
