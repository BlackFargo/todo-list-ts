import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../../store/store'

export const selectAllTodos = (state: RootState) => state.todos.todos

export const selectTodosByStatus = createSelector([selectAllTodos], todos => {
	const completed: typeof todos = []
	const incompleted: typeof todos = []

	for (const todo of todos) {
		if (todo.completed) {
			completed.push(todo)
		} else {
			incompleted.push(todo)
		}
	}
	return { completed, incompleted }
})
