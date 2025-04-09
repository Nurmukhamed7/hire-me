'use client'

import { Provider } from 'react-redux'
import { makeStore } from './store'

interface Props {
	children: React.ReactNode
}

export default function CustomProvider({ children }: Props) {
	return <Provider store={makeStore()}>{children}</Provider>
}
