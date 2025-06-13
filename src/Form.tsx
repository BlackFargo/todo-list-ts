import type { FC } from 'react'
type props = {
	value: string
	setValue: (value: string) => void
	addTask: (value: object) => void
}
export const Form: FC<props> = ({ value, setValue, addTask }) => {
	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}
	return (
		<form onSubmit={submitHandler}>
			<label htmlFor='#task'>Task</label>
			<input
				type='text'
				id='task'
				placeholder='Type your task'
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
			<button onClick={addTask}>Add Task</button>
		</form>
	)
}
