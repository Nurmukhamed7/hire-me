'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

function Accordion({
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
	return <AccordionPrimitive.Root data-slot='accordion' {...props} />
}

function AccordionItem({
	className,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
	return (
		<AccordionPrimitive.Item
			data-slot='accordion-item'
			className={cn(
				'border-0 last:border-b-0 bg-slate-50 rounded-lg mb-2',
				className
			)}
			{...props}
		/>
	)
}

function AccordionTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
	return (
		<AccordionPrimitive.Header className='flex'>
			<AccordionPrimitive.Trigger
				data-slot='accordion-trigger'
				className={cn(
					'flex flex-1 items-center justify-between rounded-lg p-4 text-left text-base font-medium transition-all outline-none hover:bg-gray-200',
					className
				)}
				{...props}
			>
				{children}
				<ChevronDownIcon className='text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200' />
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	)
}

function AccordionContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
	return (
		<AccordionPrimitive.Content
			data-slot='accordion-content'
			className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm'
			{...props}
		>
			<div className={cn('pt-0 pb-4', className)}>{children}</div>
		</AccordionPrimitive.Content>
	)
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
