import type { FC } from 'react'
import type { Task } from './App'

type props = {
	tasks: Task[]
	value: string
	deleteTask: (id: number) => void
	toggleCompleted: (id: number) => void
	editTask: (id: number, value: string) => void
}

export const List: FC<props> = ({
	value,
	tasks,
	deleteTask,
	toggleCompleted,
	editTask,
}) => {
	return (
		<ul>
			{tasks.map(task => {
				return (
					<li
						key={task.id}
						// onClick={() => toggleCompleted(task.id)}
						style={{ color: task.isComplited ? 'green' : 'red' }}
					>
						{task.text}
						<button onClick={() => deleteTask(task.id)}>Delete</button>
						<button onClick={() => editTask(task.id, value)}>Edit</button>
					</li>
				)
			})}
		</ul>
	)
}
