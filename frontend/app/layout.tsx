import Container from '@/components/Container'
import { Setup } from '@/components/utils'
import ReactQueryProvider from '@/lib/ReactQueryProvider'
import CustomProvider from '@/store/provider'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Hire-me',
	description: 'by Nurik',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className='bg-[#faf8f2]'>
				<CustomProvider>
					<ReactQueryProvider>
						<Setup />
						<Container>{children}</Container>
					</ReactQueryProvider>
				</CustomProvider>
			</body>
		</html>
	)
}
