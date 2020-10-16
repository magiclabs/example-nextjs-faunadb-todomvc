import React, { useCallback } from 'react'
import { v4 as uuid } from 'uuid'

export default function AddTodo({ todos, mutateTodos }) {
  const addTodo = useCallback(async (e) => {
    const title = e.target.value
    if (title) {
      e.preventDefault()
      e.target.value = ''
      const tempID = uuid()

      // Immediately patch the todo data
      await mutateTodos(currTodos => [...currTodos, { id: tempID, title, completed: false, loading: true }], false)

      await fetch('/api/todo', {
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

  return (<>
    <div>
      <button disabled={!todos.length}>❯</button>
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
      }

      button:disabled {
        opacity: 0;
        pointer-events: none;
      }
    `}</style>
  </>)
}
