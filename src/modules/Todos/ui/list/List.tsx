import type { FC } from 'react'
import React from 'react'
import type { ListProps } from '../../types'
import { Todo } from '../todo/Todo'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export const List: FC<ListProps> = ({
	todos,
	toggleTodoCompleted,
	deleteTodo,
	handleEditInputChange,
	editTexts,
	editTodo,
	toggleEditStatus,
	nodeRefs,
}) => {
	return (
		<TransitionGroup component='ul'>
			{todos.map(todo => {
				if (!nodeRefs[todo.id]) {
					nodeRefs[todo.id] = React.createRef()
				}
				return (
					<CSSTransition
						classNames={'todo'}
						timeout={300}
						unmountOnExit
						nodeRef={nodeRefs[todo.id]}
						key={todo.id}
					>
						<Todo
							ref={nodeRefs[todo.id]}
							todo={todo}
							editTexts={editTexts}
							toggleTodoCompleted={toggleTodoCompleted}
							deleteTodo={deleteTodo}
							editTodo={editTodo}
							toggleEditStatus={toggleEditStatus}
							handleEditInputChange={handleEditInputChange}
						/>
					</CSSTransition>
				)
			})}
		</TransitionGroup>
	)
}
