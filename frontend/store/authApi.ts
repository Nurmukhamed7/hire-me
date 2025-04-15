import { apiFetch } from './api'

interface User {
	first_name: string
	last_name: string
	email: string
}

interface SocialAuthArgs {
	provider: string
	state: string
	code: string
}

interface CreateUserResponse {
	success: boolean
	user: User
}

export const getUser = async (): Promise<User> => {
	const res = await apiFetch('/users/me/', {
		method: 'GET',
		headers: { Accept: 'application/json' },
	})
	if (!res.ok) throw new Error('Failed to fetch user')
	return res.json()
}

export const socialAuthenticate = async ({
	provider,
	state,
	code,
}: SocialAuthArgs): Promise<CreateUserResponse> => {
	const res = await apiFetch(
		`/o/${provider}/?state=${encodeURIComponent(
			state
		)}&code=${encodeURIComponent(code)}`,
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		}
	)

	if (!res.ok) {
		throw new Error('Social auth failed')
	}

	return res.json()
}

export const login = async (email: string, password: string) => {
	const res = await apiFetch('/jwt/create/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	})

	if (!res.ok) {
		throw new Error('Login failed')
	}

	return res.json()
}

export const verify = async () => {
	const res = await apiFetch('/jwt/verify/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	})
	if (!res.ok) throw new Error('Token verify failed')
	return res.json()
}

export const logout = async () => {
	const res = await apiFetch('/logout/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	})
	if (!res.ok) throw new Error('Logout failed')
	return res
}
