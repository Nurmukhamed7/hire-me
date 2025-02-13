const CategoryButtons = () => {
	return (
		<div className='flex justify-between p-3'>
			<div>
				<button className='btn'>Service 1</button>
			</div>
			<div>
				<button className='btn btn-disabled'>Service 2</button>
			</div>
			<div>
				<button className='btn btn-disabled'>Service 3</button>
			</div>
			<div>
				<button className='btn btn-disabled'>Service 4</button>
			</div>
		</div>
	)
}

export default CategoryButtons
