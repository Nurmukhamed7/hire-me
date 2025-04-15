import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'

interface AuthState {
	isAuthenticated: boolean
	isLoading: boolean
	setAuth: () => void
	logout: () => void
	finishInitialLoad: () => void
}

export const useAuthStore = create<AuthState>(set => ({
	isAuthenticated: false,
	isLoading: true,
	setAuth: () => set({ isAuthenticated: true }),
	logout: () => set({ isAuthenticated: false }),
	finishInitialLoad: () => set({ isLoading: false }),
}))

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('Store', useAuthStore)
}
