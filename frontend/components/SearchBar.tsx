'use client'

import { getList } from '@/app/api/searchApi'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { AutoComplete } from './Autocomplete'

interface ISearchQuery {
	name: string
	slug: string
}

const SearchBar = () => {
	const [searchValue, setSearchValue] = useState<string>('')
	const [selectedValue, setSelectedValue] = useState<string>('')
	const router = useRouter()

	const [debouncedSearchValue] = useDebounce(searchValue, 300)

	const { data, isLoading } = useQuery({
		queryKey: ['data', debouncedSearchValue],
		queryFn: () => getList(debouncedSearchValue),
		enabled: debouncedSearchValue.length > 0,
	})

	const items =
		data?.map((item: ISearchQuery) => ({
			value: item.slug,
			label: item.name,
		})) ?? []

	const handleSelect = (value: string) => {
		if (!value) return

		setSelectedValue(value)
		router.push(`/service/${value}`)
	}

	return (
		<AutoComplete
			selectedValue={selectedValue}
			onSelectedValueChange={handleSelect}
			searchValue={searchValue}
			onSearchValueChange={setSearchValue}
			items={items}
			isLoading={isLoading}
			emptyMessage='Тут будут популярные услуги'
		/>
	)
}

export default SearchBar
