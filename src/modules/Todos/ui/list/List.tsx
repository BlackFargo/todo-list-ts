import type { FC } from 'react'
import type { TodoType } from '../../types'
import { Todo } from '../todo/Todo'

type Props = {
	todos: TodoType[]

	toggleTodoCompleted: (id: number) => void
	deleteTodo: (id: number) => void
	handleEditInputChange: (
		id: number
	) => (e: React.ChangeEvent<HTMLInputElement>) => void
	editTexts: Record<number, string>
	editTodo: (payload: { id: number; value: string }) => void
	toggleEditStatus: (id: number) => void
}

export const List: FC<Props> = ({
	todos,
	toggleTodoCompleted,
	deleteTodo,
	handleEditInputChange,
	editTexts,
	editTodo,
	toggleEditStatus,
}) => {
	return (
		<ul>
			{todos.map(todo => (
				<Todo
					todo={todo}
					editTexts={editTexts}
					toggleTodoCompleted={toggleTodoCompleted}
					deleteTodo={deleteTodo}
					editTodo={editTodo}
					toggleEditStatus={toggleEditStatus}
					handleEditInputChange={handleEditInputChange}
				/>
			))}
		</ul>
	)
}
