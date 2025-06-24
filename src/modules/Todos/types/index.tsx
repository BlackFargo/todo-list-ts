import type { FormEventHandler, ChangeEvent } from 'react'

export type FormProps = {
	value: string
	setValue: (value: string) => void
	submitHandler: FormEventHandler<HTMLFormElement>
	setTypeTodos: (string: string) => void
}

export type TodoType = {
	id: number
	text?: string
	title: string
	completed: boolean
	isEditing: boolean
}

export type Status = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface State {
	todos: TodoType[]
	status: Status
	loading: boolean
	error: string | null
}

export type PendingState = Omit<State, 'todos'>

export interface EditTodoPayload {
	id: number
	value: string
}

export type EditableItem = TodoType & { isEditing: boolean; isVisible: boolean }

export type TodoProps = {
	todo: TodoType
	editTexts: Record<number, string>
	toggleTodoCompleted: (id: number) => void
	deleteTodo: (id: number) => void
	editTodo: (payload: { id: number; value: string }) => void
	toggleEditStatus: (id: number) => void
	handleEditInputChange: (
		id: number
	) => (e: ChangeEvent<HTMLInputElement>) => void
}

export type ListProps = {
	todos: TodoType[]

	toggleTodoCompleted: (id: number) => void
	deleteTodo: (id: number) => void
	handleEditInputChange: (
		id: number
	) => (e: React.ChangeEvent<HTMLInputElement>) => void
	editTexts: Record<number, string>
	editTodo: (payload: { id: number; value: string }) => void
	toggleEditStatus: (id: number) => void
	nodeRefs: Record<number, React.RefObject<HTMLLIElement | null>>
}
