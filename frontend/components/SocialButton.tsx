import { Button } from './ui/button'

interface IProps {
	provider: 'google'
	children: React.ReactNode // Для переданных детей
	[rest: string]: any
}

const SocialButton = ({ provider, children, ...rest }: IProps) => {
	return (
		<Button variant={'secondary'} size={'lg'} {...rest} className='w-full'>
			{children}
		</Button>
	)
}

export default SocialButton
