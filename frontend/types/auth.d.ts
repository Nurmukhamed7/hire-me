export interface User {
	id: number
	email: string
	first_name: string
	last_name: string
}

export interface SocialAuthArgs {
	provider: string
	state: string
	code: string
}

export interface CreateUserResponse {
	success: boolean
	user: User
}
