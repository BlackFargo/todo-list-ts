import type { Middleware } from '@reduxjs/toolkit'

export const logger: Middleware = store => next => action => {
	const result = next(action)

	console.log('[Middleware] Next state:', store.getState())
	localStorage.setItem('todos', JSON.stringify(store.getState().todos.todos))
	return result
}
