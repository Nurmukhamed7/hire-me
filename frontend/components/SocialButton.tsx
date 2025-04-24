import { Button } from './ui/button'

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	provider: 'google'
	children: React.ReactNode
}

const SocialButton = ({ children, ...rest }: IProps) => {
	return (
		<Button variant={'secondary'} size={'lg'} {...rest} className='w-full'>
			{children}
		</Button>
	)
}

export default SocialButton
