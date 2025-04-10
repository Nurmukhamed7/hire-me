import { Button } from './ui/button'

interface IProps {
	provider: 'google'
	children: React.ReactNode // Для переданных детей
	[rest: string]: any
}

const SocialButton = ({ provider, children, ...rest }: IProps) => {
	return (
		<Button {...rest} className='hover:cursor-pointer '>
			{children}
		</Button>
	)
}

export default SocialButton
