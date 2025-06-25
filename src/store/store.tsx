import { configureStore } from '@reduxjs/toolkit'

import todosSlice from '../modules/Todos/store/todosSlice'
import { logger } from './middleware'

const store = configureStore({
	reducer: {
		todos: todosSlice,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
