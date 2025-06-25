import type { FC } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Form } from '../ui/form/Form'
import {
	addTodo,
	fetchTodos,
	toggleTodoCompleted,
	deleteTodo,
	editTodo,
	toggleEditStatus,
} from '../store/todosSlice'
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks'
import { List } from '../ui/list/List'
import type { TodoType } from '../types'
import { selectTodosByStatus } from '../store/selectors'

export const TodosModule: FC = () => {
	const { completed, incompleted } = useAppSelector(selectTodosByStatus)
	const [value, setValue] = useState<string>('')
	const todos = useAppSelector(state => state.todos.todos)
	const [editTexts, setEditTexts] = useState<Record<number, string>>({})
	const dispatch = useAppDispatch()
	const [typeTodos, setTypeTodos] = useState('all')

	const nodeRefs = useRef<Record<number, React.RefObject<HTMLLIElement>>>({})

	const submitHandler = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			if (value.trim()) {
				const newTodo: TodoType = {
					id: Date.now(),
					title: value,
					completed: false,
					isEditing: false,
				}
				dispatch(addTodo(newTodo))
				setValue('')
			}
		},
		[value, dispatch]
	)

	const handleEditInputChange = useCallback(
		(id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
			setEditTexts(prev => ({
				...prev,
				[id]: e.target.value,
			}))
		},
		[dispatch]
	)

	const handleToggleTodoCompleted = useCallback(
		(id: number) => {
			dispatch(toggleTodoCompleted(id))
		},
		[dispatch]
	)

	const handleDeleteTodo = useCallback(
		(id: number) => {
			dispatch(deleteTodo(id))
		},
		[dispatch]
	)

	const handleEditTodo = useCallback(
		(payload: { id: number; value: string }) => {
			dispatch(editTodo(payload))
		},
		[dispatch]
	)

	const handleToggleEditStatus = useCallback(
		(id: number) => {
			dispatch(toggleEditStatus(id))
		},
		[dispatch]
	)

	useEffect(() => {
		if (todos.length !== 0) return
		dispatch(fetchTodos())
	}, [todos.length, dispatch])

	let displayedTodos: TodoType[] = todos

	if (typeTodos === 'All') {
		displayedTodos = todos
	} else if (typeTodos === 'Completed') {
		displayedTodos = completed
	} else if (typeTodos === 'Incompleted') {
		displayedTodos = incompleted
	}
	return (
		<div className='flex flex-col gap-y-5 bg-white p-5  h-[800px] overflow-auto max-w-xl mt-10'>
			<Form
				value={value}
				setValue={setValue}
				submitHandler={submitHandler}
				setTypeTodos={setTypeTodos}
			/>
			<List
				todos={displayedTodos}
				toggleTodoCompleted={handleToggleTodoCompleted}
				deleteTodo={handleDeleteTodo}
				handleEditInputChange={handleEditInputChange}
				editTexts={editTexts}
				editTodo={handleEditTodo}
				toggleEditStatus={handleToggleEditStatus}
				nodeRefs={nodeRefs.current}
			/>
		</div>
	)
}
