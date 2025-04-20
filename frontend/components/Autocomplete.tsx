'use client'

import { Command as CommandPrimitive } from 'cmdk'
import { useMemo, useState } from 'react'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from './ui/command'
import { Input } from './ui/input'
import { Popover, PopoverAnchor, PopoverContent } from './ui/popover'
import { Skeleton } from './ui/skeleton'

type Props<T extends string> = {
	selectedValue: T
	onSelectedValueChange: (value: T) => void
	searchValue: string
	onSearchValueChange: (value: string) => void
	items: { value: T; label: string }[]
	isLoading?: boolean
	emptyMessage?: string
	placeholder?: string
}

export function AutoComplete<T extends string>({
	selectedValue,
	onSelectedValueChange,
	searchValue,
	onSearchValueChange,
	items,
	isLoading,
	emptyMessage = 'No items.',
	placeholder = 'Найти услугу...',
}: Props<T>) {
	const [open, setOpen] = useState(false)
	const [changePlaceholder, setChangePlaceholder] = useState(false)

	const labels = useMemo(
		() =>
			items.reduce((acc, item) => {
				acc[item.value] = item.label
				return acc
			}, {} as Record<string, string>),
		[items]
	)

	const reset = () => {
		onSelectedValueChange('' as T)
		onSearchValueChange('')
	}

	const onSelectItem = (inputValue: string) => {
		if (inputValue !== selectedValue) {
			onSelectedValueChange(inputValue as T)
			onSearchValueChange(labels[inputValue] ?? '')
		}
		setOpen(false)
	}

	return (
		<div className='flex items-center'>
			<Popover open={open} onOpenChange={setOpen}>
				<Command shouldFilter={false}>
					<PopoverAnchor asChild>
						<CommandPrimitive.Input
							asChild
							value={searchValue}
							onValueChange={onSearchValueChange}
							onKeyDown={e => setOpen(e.key !== 'Escape')}
							onMouseDown={() => setOpen(open => !!searchValue || !open)}
							onFocus={() => {
								setChangePlaceholder(true)
								setOpen(true)
							}}
							onBlur={() => setChangePlaceholder(false)}
						>
							<Input
								placeholder={
									changePlaceholder
										? 'Например, установка кондиционера'
										: placeholder
								}
							/>
						</CommandPrimitive.Input>
					</PopoverAnchor>
					{!open && <CommandList aria-hidden='true' className='hidden' />}
					<PopoverContent
						asChild
						onOpenAutoFocus={e => e.preventDefault()}
						onInteractOutside={e => {
							if (
								e.target instanceof Element &&
								e.target.hasAttribute('cmdk-input')
							) {
								e.preventDefault()
							}
						}}
						className='min-w-[400px] max-w-[400px] w-full px-0'
						sideOffset={2}
					>
						<CommandList>
							{isLoading && (
								<CommandPrimitive.Loading>
									<div className='p-1'>
										<Skeleton className='h-6 w-full' />
									</div>
								</CommandPrimitive.Loading>
							)}
							{items.length > 0 && !isLoading ? (
								<CommandGroup heading='Услуги'>
									{items.map(option => (
										<CommandItem
											key={option.value}
											value={option.value}
											onMouseDown={e => e.preventDefault()}
											onSelect={onSelectItem}
										>
											{option.label}
										</CommandItem>
									))}
								</CommandGroup>
							) : null}
							{!isLoading ? (
								<CommandEmpty>{emptyMessage ?? 'No items.'}</CommandEmpty>
							) : null}
						</CommandList>
					</PopoverContent>
				</Command>
			</Popover>
		</div>
	)
}
