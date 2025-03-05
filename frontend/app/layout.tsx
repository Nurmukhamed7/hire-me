import ReactQueryProvider from '@/shared/providers/ReactQueryProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/Header/Header'
import MobileNav from './components/Nav/Nav'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
	viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<ReactQueryProvider>
					<div className='max-w-[420px] mx-auto flex flex-col min-h-screen bg-white'>
						<Header />
						<main>{children}</main>
						<MobileNav />
					</div>
				</ReactQueryProvider>
			</body>
		</html>
	)
}
