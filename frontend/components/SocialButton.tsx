import { Loader2 } from 'lucide-react'
import { Button } from './ui/button'

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	provider: 'google'
	children: React.ReactNode
	loading?: boolean
}

const SocialButton = ({ children, loading, ...rest }: IProps) => {
	return (
		<Button
			variant={'secondary'}
			size={'lg'}
			{...rest}
			className='w-full'
			disabled={loading}
		>
			{loading ? (
				<>
					<Loader2 className='h-5 w-5 animate-spin mr-2' />
					Please wait
				</>
			) : (
				children
			)}
		</Button>
	)
}

export default SocialButton
