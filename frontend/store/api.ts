import { Mutex } from 'async-mutex'
import { useAuthStore } from './store'

const mutex = new Mutex()

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`

export const apiFetch = async (
	input: RequestInfo,
	init?: RequestInit
): Promise<Response> => {
	await mutex.waitForUnlock()
	let res = await fetch(`${BASE_URL}${input}`, {
		credentials: 'include',
		...init,
	})

	if (res.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire()
			try {
				const refreshRes = await fetch(`${BASE_URL}/jwt/refresh/`, {
					method: 'POST',
					credentials: 'include',
				})

				if (refreshRes.ok) {
					useAuthStore.getState().setAuth()
					res = await fetch(`${BASE_URL}${input}`, {
						credentials: 'include',
						...init,
					})
				} else {
					useAuthStore.getState().logout()
				}
			} finally {
				release()
			}
		} else {
			await mutex.waitForUnlock()
			res = await fetch(`${BASE_URL}${input}`, {
				credentials: 'include',
				...init,
			})
		}
	}

	return res
}
