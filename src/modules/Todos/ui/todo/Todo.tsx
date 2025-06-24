import { forwardRef } from 'react'
import type { TodoProps } from '../../types'

export const Todo = forwardRef<HTMLLIElement, TodoProps>(
	(
		{
			todo,
			editTexts,
			toggleTodoCompleted,
			deleteTodo,
			editTodo,
			toggleEditStatus,
			handleEditInputChange,
		},
		ref
	) => {
		return (
			<li
				ref={ref}
				className={`mb-2 flex flex-col gap-y-2 sm:flex-row break-all 
				`}
			>
				<div
					onClick={() => toggleTodoCompleted(todo.id)}
					className={`cursor-pointer text-[20px] p-2 ${
						todo.completed ? 'text-green-600' : 'text-red-500'
					}`}
				>
					{todo.id} - {todo.title}
				</div>
				<button
					onClick={() => {
						deleteTodo(todo.id)
					}}
					className='ml-2 px-2 py-1 bg-red-400 text-white rounded cursor-pointer hover:brightness-90 active:brightness-90 transition min-w-20 max-h-10'
				>
					Delete
				</button>
				{todo.isEditing ? (
					<>
						<input
							type='text'
							value={editTexts[todo.id] ?? todo.title}
							onChange={handleEditInputChange(todo.id)}
							className='border p-1 ml-2 rounded max-h-10'
							placeholder='Text to edit'
						/>
						<button
							onClick={() => {
								editTodo({
									id: todo.id,
									value: editTexts[todo.id] ?? todo.title,
								})
								toggleEditStatus(todo.id)
							}}
							className='ml-2 px-2 py-1 bg-green-500 text-white rounded hover:brightness-90 active:brightness-90 transition cursor-pointer min-w-20 max-h-10'
						>
							Save
						</button>
					</>
				) : (
					<button
						onClick={() => toggleEditStatus(todo.id)}
						className='ml-2 px-2 py-1 bg-blue-400 text-white rounded hover:brightness-90 active:brightness-90 transition cursor-pointer min-w-20 max-h-10'
					>
						Edit
					</button>
				)}
			</li>
		)
	}
)

Todo.displayName = 'Todo' // важно для корректной работы с forwardRef
