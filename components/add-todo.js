import React, { useCallback } from 'react'
import { v4 as uuid } from 'uuid'

export default function AddTodo({ todos, mutateTodos }) {
  const addTodo = useCallback((e) => {
    const title = e.target.value
    if (title) {
      e.preventDefault()
      e.target.value = ''
      const tempID = uuid()

      // Immediately update local state so we don't
      // have to wait for remote server to finish processing the request.
      mutateTodos(currTodos => [...currTodos, { id: tempID, title, completed: false, loading: true }], false)

      // Send a `POST` request to add remote todo state,
      // then re-validate our local todo state.
      fetch('/api/todo', {
          method: 'POST',
          body: JSON.stringify({ title })
        })
        .then(() => mutateTodos())
    }
  }, [mutateTodos])

  const addTodoOnPressEnter = useCallback(async (e) => {
    if (e.keyCode === 13) {
      addTodo(e)
    }
  }, [addTodo])

  const hasActiveTodos = !!todos.find(todo => !todo.completed)

  const toggleAllTodos = useCallback(() => {
    if (hasActiveTodos) {
      mutateTodos(currTodos => currTodos.map(todo => ({ ...todo, completed: true })), false)
      fetch('/api/todos', { method: 'PATCH', body: JSON.stringify({ completed: true }) }).then(() => mutateTodos())
    } else {
      mutateTodos(currTodos => currTodos.map(todo => ({ ...todo, completed: false })), false)
      fetch('/api/todos', { method: 'PATCH', body: JSON.stringify({ completed: false }) }).then(() => mutateTodos())
    }
  }, [hasActiveTodos])

  return (<>
    <div>
      <button
        disabled={!todos.length}
        onClick={toggleAllTodos}
        aria-label={hasActiveTodos
          ? 'Mark all todos as complete'
          : 'Mark all todos as incomplete'}>
          ❯
      </button>

      <input
        aria-label="What needs to be done?"
        placeholder="What needs to be done?"
        onBlur={addTodo}
        onKeyDown={addTodoOnPressEnter} />
    </div>

    <style jsx>{`
      div {
        display: flex;
      }

      input {
        flex-grow: 1;
        border: none;
        padding: 16px;
        font-size: 24px;
        font-weight: 100;
        color: #4d4d4d;
      }

      input::placeholder {
        color: #e2dcff;
        font-style: italic;
      }

      input:focus {
        outline: none;
      }

      button {
        font-size: 22px;
        color: #e6e6e6;
        padding: 0 27px;
        background: transparent;
        border: none;
        transform: rotate(90deg);
        cursor: pointer;
        transition: all 0.2s;
      }

      button:hover {
        color: #4d4d4d
      }

      button:disabled {
        opacity: 0;
        pointer-events: none;
      }
    `}</style>
  </>)
}
