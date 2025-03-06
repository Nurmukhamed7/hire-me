import Container from '@/components/Container'
import ReactQueryProvider from '@/lib/ReactQueryProvider'
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
				<ReactQueryProvider>
					<Container>{children}</Container>
				</ReactQueryProvider>
			</body>
		</html>
	)
}
