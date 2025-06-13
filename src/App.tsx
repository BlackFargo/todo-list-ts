import { useState } from 'react'
import { Form } from './Form'
import { List } from './List'

export type Task = {
	id: number
	text: string | null
	isComplited: boolean
	isEditing: boolean
}

function App() {
	const [value, setValue] = useState<string>('')
	const [tasks, setTasks] = useState<Task[]>([])

	const addTask = () => {
		if (value === '') return
		const newTask: Task = {
			id: Date.now(),
			text: value,
			isComplited: false,
			isEditing: false,
		}
		setTasks(prev => [...prev, newTask])
		setValue('')
	}

	const deleteTask = (id: number) => {
		setTasks(prev =>
			prev.filter(t => {
				return t.id !== id
			})
		)
	}

	const toggleCompleted = (id: number) => {
		setTasks(prev =>
			prev.map(t => {
				return t.id === id ? { ...t, isComplited: !t.isComplited } : t
			})
		)
	}

	const editTask = (id: number, value: string) => {
		setTasks(prev =>
			prev.map(t => {
				return t.id === id ? { ...t, text: value } : t
			})
		)
		setValue('')
	}

	return (
		<>
			<Form value={value} setValue={setValue} addTask={addTask} />
			<List
				value={value}
				tasks={tasks}
				deleteTask={deleteTask}
				toggleCompleted={toggleCompleted}
				editTask={editTask}
			/>
		</>
	)
}

export default App
