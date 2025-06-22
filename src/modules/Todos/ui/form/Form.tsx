import type { FC } from 'react'
import type { FormProps } from '../../types'
import { FilterButton } from '../filterButton/FilterButton'

export const Form: FC<FormProps> = ({
	value,
	setValue,
	submitHandler,
	setTypeTodos,
}) => {
	return (
		<form onSubmit={submitHandler} className=''>
			<h1 className='text-4xl font-bold'>Todo App</h1>
			<div className='flex flex-col  mt-5 gap-x-2 md:flex-row'>
				<input
					type='text'
					id='task'
					placeholder='Add your new todo'
					value={value}
					onChange={e => setValue(e.target.value)}
					className='w-full border-2 border-gray-400 p-3 font-bold text-2xl rounded'
				/>
				<button
					type='submit'
					aria-label='Add new task'
					className='p-3 bg-purple-500 rounded text-3xl text-white cursor-pointer flex items-center justify-center hover:brightness-90 transition w-full mt-2 md:mt-0 md:w-15 '
				>
					+
				</button>
			</div>
			<div className='flex flex-col gap-y-2 mt-2 gap-x-2 md:flex-row'>
				<FilterButton
					label='Completed'
					colorClass='bg-green-500'
					onClick={() => setTypeTodos('Completed')}
					ariaLabel='Completed tasks'
				/>
				<FilterButton
					label='Incompleted'
					colorClass='bg-red-400'
					onClick={() => setTypeTodos('Incompleted')}
					ariaLabel='Incomplete tasks'
				/>
				<FilterButton
					label='All'
					colorClass='bg-amber-400'
					onClick={() => setTypeTodos('All')}
					ariaLabel='All tasks'
				/>
			</div>
		</form>
	)
}
