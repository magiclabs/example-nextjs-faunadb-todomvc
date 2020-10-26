import React, { useCallback } from 'react'
import classNames from 'classnames'

export default function TodoItem({ id, title, completed, loading, mutateTodos }) {
  const updateTodo = useCallback((data) => {
    // Immediately update local state so we don't
    // have to wait for remote server to finish processing the request.
    mutateTodos(currTodos => {
      return currTodos.map(todo => id === todo.id ? { ...todo, ...data }: todo)
    }, false)

    // Send a `PATCH` request to update remote todo state,
    // then re-validate our local todo state.
    fetch(`/api/todo?id=${id}`, { method: 'PATCH', body: JSON.stringify(data) })
      .then(() => mutateTodos())
  }, [id])

  const deleteTodo = useCallback(async () => {
    // Immediately remove the todo from local state so we don't
    // have to wait for remote server to finish processing the request.
    mutateTodos(currTodos => [...currTodos].filter(todo => id !== todo.id), false)

    // Send a `DELETE` request to update remote todo state,
    // then re-validate our local todo state.
    await fetch(`/api/todo?id=${id}`, { method: 'DELETE' })
  }, [id])

  const updateTodoCompletedStateOnInputChange = useCallback(async (e) => {
    e.preventDefault()
    updateTodo({ completed: !completed})
  }, [updateTodo, completed])

  const updateTodoTitleOnInputBlur = useCallback((e) => {
    e.preventDefault()
    if (e.target.value) {
      updateTodo({ title: e.target.value })
    } else {
      e.target.value = title
    }
  }, [updateTodo, title])

  const updateTodoTitleOnPressEnter = useCallback((e) => {
    if (e.keyCode === 13) {
      updateTodoTitleOnInputBlur(e)
    }
  }, [updateTodoTitleOnInputBlur])

  return (<>
    <div className="todo">
      <input
        className="checkbox"
        disabled={loading}
        type="checkbox"
        checked={completed}
        onChange={updateTodoCompletedStateOnInputChange} />

      <input
        className={classNames('title', completed && 'completed')}
        defaultValue={title}
        placeholder={title}
        onBlur={updateTodoTitleOnInputBlur}
        onKeyDown={updateTodoTitleOnPressEnter} />

      <button className="delete-button" disabled={loading} onClick={deleteTodo}>x</button>
    </div>

    <style jsx>{`
      .todo {
        display: flex;
        align-items: center;
        border-top: solid 1px #eeeeee;
      }

      .title {
        flex-grow: 1;
        border: none;
        padding: 16px;
        font-size: 24px;
        font-weight: 100;
        color: #4d4d4d;
        opacity: 1;
        transition: all 0.2s;
      }

      .title::placeholder {
        color: #e2dcff;
        font-style: italic;
      }

      .title:focus {
        outline: none;
      }

      .title.completed {
        text-decoration: line-through;
        opacity: 0.5;
      }

      .todo:hover .delete-button {
        opacity: 1;
      }

      .delete-button {
        opacity: 0;
        border: none;
        background: transparent;
        padding: 0 30px;
        cursor: pointer;
        color: #ff5635;
        font-size: 20px;
        font-weight: 100;
        transform: scale(1);
        transition: all 0.2s;
      }

      .delete-button:hover {
        transform: scale(1.2);
      }

      .checkbox {
        margin: 0 25px;
      }
    `}</style>
  </>)
}
