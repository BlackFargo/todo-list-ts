import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../store/store'
import { isPending } from '@reduxjs/toolkit'
import type {
	State,
	EditTodoPayload,
	EditableItem,
	TodoType,
	PendingState,
} from '../types'

const initialState: State = {
	todos: JSON.parse(localStorage.getItem('todos') || '[]'),
	status: 'idle',
	loading: false,
	error: null,
}

const pendingState = (state: PendingState) => {
	state.status = 'loading'
	state.error = null
	state.loading = true
}

export const fetchTodos = createAsyncThunk<
	TodoType[],
	undefined,
	{ rejectValue: string }
>('todos/fetchTodos', async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(
			'https://jsonplaceholder.typicode.com/todos?_limit=10'
		)
		if (!response.ok) {
			return rejectWithValue(`Server error`)
		}
		const data = await response.json()
		const customData: EditableItem[] = data.map((prev: TodoType) => ({
			...prev,
			isEditing: false,
		}))
		return customData
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message)
		}
		return rejectWithValue('Unknown error occurred')
	}
})

export const toggleTodoCompleted = createAsyncThunk<
	TodoType,
	number,
	{ rejectValue: string }
>(
	'todos/toggleCompleted',
	async (id: number, { rejectWithValue, getState }) => {
		try {
			const state = getState() as RootState
			const todo = state.todos.todos.find(todo => todo.id === id)
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/todos/${id}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						completed: !todo?.completed,
					}),
				}
			)
			if (!response.ok) {
				throw new Error(`Server error`)
			}
			const data = await response.json()
			return data
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Unknown error occurred')
		}
	}
)

export const deleteTodo = createAsyncThunk(
	'todos/deleteTodo',
	async (id: number, { rejectWithValue }) => {
		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/todos/${id}`,
				{
					method: 'DELETE',
					headers: {
						'Content-type': 'application/json',
					},
				}
			)
			if (!response.ok) {
				throw new Error(`Server error`)
			}
			return id
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Unknown error occurred')
		}
	}
)

export const editTodo = createAsyncThunk(
	'todos/editTodo',
	async ({ id, value }: EditTodoPayload, { rejectWithValue }) => {
		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/todos/${id}`,
				{
					method: 'PATCH',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify({ title: value }),
				}
			)
			if (!response.ok) {
				throw new Error(`Server error`)
			}
			return { id, value }
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Unknown error occurred')
		}
	}
)

export const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo(state, action: PayloadAction<TodoType>) {
			if (action.payload.title.trim() === '') return
			state.todos.push(action.payload)
		},

		toggleEditStatus(state, action: PayloadAction<number>) {
			state.todos = state.todos.map(todo =>
				todo.id === action.payload
					? { ...todo, isEditing: !todo.isEditing }
					: todo
			)
		},
	},
	extraReducers: builder => {
		builder

			.addCase(
				fetchTodos.fulfilled,
				(state, action: PayloadAction<TodoType[]>) => {
					state.status = 'succeeded'
					state.loading = false
					state.todos = action.payload
				}
			)
			.addCase(fetchTodos.rejected, (state, action) => {
				state.status = 'failed'
				state.loading = false
				state.error =
					typeof action.payload === 'string' ? action.payload : 'Unknown error'
			})

			.addCase(
				toggleTodoCompleted.fulfilled,
				(state, action: PayloadAction<TodoType>) => {
					state.todos = state.todos.map(todo =>
						todo.id === action.payload.id ? action.payload : todo
					)
					state.status = 'succeeded'
					state.loading = false
				}
			)
			.addCase(toggleTodoCompleted.rejected, (state, action) => {
				state.status = 'failed'
				state.loading = false
				state.error =
					typeof action.payload === 'string' ? action.payload : 'Unknown error'
			})

			.addCase(deleteTodo.fulfilled, (state, action) => {
				state.loading = false
				state.todos = state.todos.filter(todo => todo.id !== action.payload)
			})
			.addCase(deleteTodo.rejected, (state, action) => {
				state.loading = false
				state.error =
					typeof action.payload === 'string' ? action.payload : 'Unknown error'
			})

			.addCase(
				editTodo.fulfilled,
				(state, action: PayloadAction<EditTodoPayload>) => {
					state.loading = false
					state.todos = state.todos.map(todo =>
						todo.id === action.payload.id
							? { ...todo, title: action.payload.value }
							: todo
					)
				}
			)
			.addCase(editTodo.rejected, (state, action) => {
				state.status = 'failed'
				state.loading = false
				state.error =
					typeof action.payload === 'string' ? action.payload : 'Unknown error'
			})
			.addMatcher(isPending, pendingState)
	},
})

export const { addTodo, toggleEditStatus } = todosSlice.actions
export default todosSlice.reducer
