import React, { useCallback, useState } from 'react';

export default function TodoItem({ id, title, completed, loading, mutateTodos }) {
  const [value, setValue] = useState(title)

  const handleTitleInputChange = useCallback((e) => {
    setValue(e.target.value)
  }, [])

  const handleTitleInputBlur = useCallback((e) => {
    if (!e.target.value) {
      setValue(title)
    } else {
      setValue(e.target.value)
    }
  }, [])

  const handleDelete = useCallback(async () => {
    mutateTodos(currTodos => [...currTodos].filter(todo => id !== todo.id), false)
    await fetch(`/api/todo?id=${id}`, { method: 'DELETE' })
  }, [id])

  return (<>
    <div className="todo">
      <input disabled={loading} type="checkbox" />
      <input
        className="title"
        value={value}
        placeholder={title}
        onChange={handleTitleInputChange}
        onBlur={handleTitleInputBlur} />
      <button disabled={loading} onClick={handleDelete}>X</button>
    </div>

    <style jsx>{`
      .todo {
        display: flex;
        border-top: solid 1px #eeeeee;
      }

      .title {
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
    `}</style>
  </>)
}
